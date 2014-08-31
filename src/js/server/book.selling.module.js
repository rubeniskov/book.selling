(function( $ ){
    
    var swig        = require('swig'),

        cheerio     = require("cheerio"),

        path        = require("path"),

        fs          = require("fs");

    $.module        = function( service, name )
    {
        return $.module.load( service, name );
    }

    $.module.render     = function( service, html, includes )
    {
        var _$ = cheerio.load( html );

        _$('module[name]').each( function( i, element )
        {
            var element = _$( element ),

                name    = element.attr( 'name' ),

                module  = $.module.load( service, name ),

                html    = 'Module ' + name + ' doesn\'t found';

                if( module.html )
                {
                    html = module.html;
                }

                if( includes && !includes[ name ] && module.script && module.script.__ready )
                {
                    includes[ name ] = module.script.__ready;
                }

                element.replaceWith
                (
                    '<!-- MODULE ' + name.toUpperCase() +  ' START -->' +

                    '<div class="module module-' + name.toLowerCase() + '">' + $.module.render( service, html, includes ) + '</div>' +

                    '<!-- MODULE ' + name.toUpperCase() +  ' END -->'
                );
        });

        return _$.html();
    }

    $.module.load       = function( service, name )
    {
        var script = $.module.getScript( service, name );

        return ({ 
            html    : $.module.getHTML( service, name, script && script.__render && script.__render.call ? script.__render.call( null ) : {} ), 

            script  : script
        });
    }

    $.module.getFile    = function( service, name, file )
    {
        var file    = path.join( $.config.dir.root, 'services', service, 'modules', name, file );

        return fs.existsSync( file ) ? file : false;
    }

    $.module.getHTML    = function( service, name, data )
    {
        var html    = $.module.getFile( service, name, 'index.html' );

        return html ? swig.renderFile( html, data ) : 'Module index.html - ' + name + ' doesn\'t found';
    }

    $.module.getScript  = function( service, name )
    {
        var script  = $.module.getFile( service, name, 'index.js' );

        return require( script )( $ );
    }
return false;
    $.module.load       = function( name, context )
    {
        var html        = $.module.getHTML( name ),

            script      = $.module.getScript( name ),

            $html       = cheerio.load( html );

            if( context && script.__ready )
                context( 'head' ).append
                ( 
                    '<script ref="' + name + '" type="text/javascript">$.use( "module-' + name.toLowerCase() + '" ,' + script.__ready +  ')</script>' 
                );

            $html('module[name]').each( function( i, element )
            {
                var ele     = $html( element ),

                    name    = ele.attr( 'name' );

                ele.replaceWith
                (
                    '<!-- MODULE ' + name.toUpperCase() +  ' START -->' +

                    '<div class="module module-' + name.toLowerCase() + '">' + $.module.load( ele.attr( 'name' ), context ) + '<div>' +

                    '<!-- MODULE ' + name.toUpperCase() +  ' END -->'
                );
            });

            console.log( 'Load Module ' + name );

        return swig.renderFile( $html.html(), script.__render ? script.__render() : {} );
    }

})( BookSelling );