(function( bs ){

    var express = require('express'),

        app     = express(),

        session = require('express-session'),
        
      // mongos  = require('connect-mongo')(connect),

        url     = require("url"),

        path    = require("path"),

        fs      = require("fs"),

        mime    = require("mime"),

        service = bs.config.service,

        ddport   = process.argv[2] || 8888;

        app.use(session({secret: 'keyboard cat'}))

        app.use( function( request, response )
        {
            var uri         = url.parse( request.url ).pathname,

                filename    = path.join( process.cwd(),  uri );

            if( ( /\..*$/ ).test( uri ) )
            {
                if( fs.existsSync( filename ) && !fs.statSync( filename ).isDirectory() )
                {
                    return fs.readFile( filename, "binary", function( err, file ) 
                    {
                        if( err ) 
                        {        
                            return data = err;
                        }

                        response
                        .set
                        ({
                            'Content-Type': mime.lookup( filename ),
                            //'Content-Length': '123',
                            //'ETag': '12345'
                        })
                        .status( 200 )
                        .send( file );
                    });
                }
            }
            else
            {
                bs.service( service, { request : request, response : response } );
            }
        });

    bs.server =
    ({
        start   : function( port )
        {
            bs.socket( app.listen( parseInt( port || dport, 10 ) ) );
        },
        stop    : function()
        {

        }
    }); 

})( BookSelling );


