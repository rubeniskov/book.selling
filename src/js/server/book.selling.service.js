(function( $ ){
    
    var swig        = require('swig'),

        url         = require("url"),

        fs          = require("fs"),

        cheerio     = require("cheerio"),

        path        = require("path"),

        services    = Object.keys( $.config.services );

    $.service       = function( name, app )
    {
        var uri         = url.parse( app.request.url ).pathname,

            filename    = path.join( $.config.dir.root,  uri ),

            segments    = uri.split( '/' ).slice( 1 );

            section     = segments[ 0 ] || 'home',

            main        = path.join( $.config.dir.root, 'services',  name, 'index.html' ),

            view        = $.view( name, section, app );

            if( fs.existsSync( main ) )
            {
                main        = swig.renderFile( main, { view : view } );    

                app.response.set
                ({
                    'Content-Type': 'text/html'
                })
                .status( 200 )
                .send( main );
            }
            

            

        //console.log( name, server );

        //return $main.html();     
    }
/*
    $.view.getHTML      = function( name )
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
                context( 'head' ).append( '<script ref="' + name + '" type="text/javascript">$( document.body ).ready(' + script.__ready +  ')</script>' );

            $html('module[name]').each( function( i, element )
            {
                var ele = $html( element );

                console.log( ele );

                ele.replaceWith( $.module.load( ele.attr( 'name' ), context ) );
            });

            console.log( 'Load Module ' + name );

        return swig.renderFile( $html.html(), script.__render ? script.__render() : {} );
    }*/

})( BookSelling );