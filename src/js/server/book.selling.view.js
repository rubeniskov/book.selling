(function( $ ){
    
    /*var swig        = require('swig'),

        cheerio     = require("cheerio"),

        path        = require("path"),

        sections    = path.join( $.config.dir.modules, 'site' ),

        main        = path.join( sections, 'index.html' );

    $.view          = function( name )
    {
        $main       = cheerio.load( swig.renderFile( main ) );

        $main('module[name]').each( function( i, element )
        {
            var ele     = $main( element ),

                html    = $.module.load( ele.attr( 'name' ) == 'main' ? name : ele.attr( 'name' ), $main );

            ele.replaceWith( html );
        });

        return $main.html();     
    }

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