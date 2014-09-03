(function( bs ){
    
    var swig        = require('swig'),

        url         = require("url"),

        fs          = require("fs"),

        cheerio     = require("cheerio"),

        path        = require("path"),

        services    = Object.keys( bs.config.services );

    bs.service       = function( name, app )
    {
        var uri         = url.parse( app.request.url ).pathname,

            filename    = path.join( bs.config.dir.root,  uri ),

            segments    = uri.split( '/' ).slice( 1 );

            section     = segments[ 0 ] || 'home',

            main        = path.join( bs.config.dir.root, 'services',  name, 'index.html' ),

            view        = bs.view( name, section, app );

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
    }

    bs.service.getViews     = function( service, view )
    {
        return view ? : bs.config.services[ service ][ 'views'];
    }
    
})( BookSelling );