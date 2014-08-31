(function( $ ){

    var connect = require('connect'),

        app     = connect(),
        
        mongos  = require('connect-mongo')(connect),

        url     = require("url"),

        path    = require("path"),

        fs      = require("fs"),

        mime    = require("mime"),

        modules = new RegExp( [ "home", "books" ].join('|') ),

        port    = process.argv[2] || 8888;

        app.use( function( request, response )
        {
            var uri         = url.parse( request.url ).pathname,

                filename    = path.join( process.cwd(),  uri ),

                segments    = uri.split( '/' ).slice( 1 );

                section     = segments[ 0 ] || 'home',

                contentType = "text/html",

                statusCode  = 500,

                data        = "Error";

            if( fs.existsSync( filename ) && !fs.statSync( filename ).isDirectory() )
            {
                return fs.readFile(filename, "binary", function(err, file) 
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
            else if( true || modules.test( section ) )
            {
                data        = $.module( section );
                statusCode  = 200;
            }

            response
            .set
            ({
                'Content-Type': contentType
            })
            .status( statusCode )
            .send( data );
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


