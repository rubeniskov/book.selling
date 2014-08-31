(function( $ ){

    var connect = require('express'),

        app     = connect(),
        
      // mongos  = require('connect-mongo')(connect),

        url     = require("url"),

        path    = require("path"),

        fs      = require("fs"),

        mime    = require("mime"),

        service = $.config.service,

        port    = process.argv[2] || 8888;

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
                $.service( service, { request : request, response : response } );
            }
        });

    $.server =
    ({
        start   : function()
        {
            $.socket( app.listen( parseInt( port, 10 ) ) );
        },
        stop    : function()
        {

        }
    }); 

})( BookSelling );


