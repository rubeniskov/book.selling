(function( $ ){
    
    var swig        = require('swig'),

        cheerio     = require("cheerio"),

        path        = require("path"),

        sections    = path.join( $.config.dir.modules, $.config.view ),

        main        = path.join( sections, 'index.html' );

    $.module        = function( name )
    {
        $main       = cheerio.load( swig.renderFile( main ) );

        $main('module[name]').each( function( i, element )
        {
            var ele     = $main( element ),

                html    = $.module.load( ele.attr( 'name' ) == 'main' ? name : ele.attr( 'name' ), $main );

            ele.replaceWith
            (
                '<!-- MODULE ' + ele.attr( 'name' ).toUpperCase() +  ' START -->' +

                '<div class="module module-' + ele.attr( 'name' ).toLowerCase() + '">' + html + '</div>' +

                '<!-- MODULE ' + ele.attr( 'name' ).toUpperCase() +  ' END -->'
            );
        });

        return $main.html();     
    }

    $.module.getHTML    = function( name )
    {
        return path.join( sections, name, 'index.html' );
    }

    $.module.getScript  = function( name )
    {
        return require( path.join( sections, name, 'index.js' ) )( $ );
    }

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