(function( bs ){
    
    var swig        = require('swig'),

        url         = require("url"),

        fs          = require("fs"),

        cheerio     = require("cheerio"),

        path        = require("path"),

        services    = Object.keys( bs.config.services );

    bs.service      = function( req, res, next )
    {
        var name        = bs.config.service

            uri         = url.parse( req.url, true ),

            filename    = path.join( bs.config.dir.root,  uri.pathname ),

            segments    = uri.pathname.split( '/' ).slice( 1 );

            section     = segments[ 0 ] || 'home',

            main        = path.join( bs.config.dir.root, 'services',  name, 'index.html' ),

            view        = bs.view( name, section, 
            { 
                user        : req.session.user, 

                session     : req.session, 

                request     : req,

                response    : res,

                next        : next,

                view        : section,

                segments    : segments.slice( 1 ),

                params      : uri.query
            });

            if( fs.existsSync( main ) )
            {
                main        = swig.renderFile( main, { view : view } );    

                res.set
                ({
                    'Content-Type': 'text/html'
                })
                .status( 200 )
                .send( main );
            }
            else
            {
                next();
            }
    }

    bs.service.getViews     = function( service, view )
    {
        return view ? bs.service.getViews( service )[ view ] : bs.config.services[ service ][ 'views'];
    }
    
})( BookSelling );