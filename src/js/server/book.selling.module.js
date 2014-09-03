(function( bs ){
    
    var swig        = require('swig'),

        cheerio     = require("cheerio"),

        path        = require("path"),

        fs          = require("fs");

    bs.module        = function( service, name, app )
    {
        return bs.module.load( service, name, app );
    }

    bs.module.render     = function( service, html, includes, app )
    {
        var $ = cheerio.load( html );

        $('module[name]').each( function( i, element )
        {
            var element = $( element ),

                name    = element.attr( 'name' ),

                module  = bs.module.load( service, name, app ),

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

                    '<div class="module module-' + name.toLowerCase() + '">' + bs.module.render( service, html, includes, app ) + '</div>' +

                    '<!-- MODULE ' + name.toUpperCase() +  ' END -->'
                );
        });

        return $.html();
    }

    bs.module.load       = function( service, name, app )
    {
        var script = bs.module.getScript( service, name ),

            render = { user: app.user, session : app.session };

            console.log( render );

        return ({ 
            html    : bs.module.getHTML( service, name, script && script.__render && script.__render.call ? bs.extend( render, script.__render.call( null, app ) ) : render ), 

            script  : script
        });
    }

    bs.module.getFile    = function( service, name, file )
    {
        var file    = path.join( bs.config.dir.root, 'services', service, 'modules', name, file );

        return fs.existsSync( file ) ? file : false;
    }

    bs.module.getHTML    = function( service, name, data )
    {
        var html    = bs.module.getFile( service, name, 'index.html' );

        return html ? swig.renderFile( html, data ) : 'Module index.html - ' + name + ' doesn\'t found';
    }

    bs.module.getScript  = function( service, name )
    {
        var script  = bs.module.getFile( service, name, 'index.js' );

        return require( script )( bs /*, socket*/ );
    }

})( BookSelling );