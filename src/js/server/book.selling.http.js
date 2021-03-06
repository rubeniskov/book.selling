(function( bs ){

    var express = require('express'),

        und     = require('underscore'),

        http    = require('http'),

        url     = require("url"),

        path    = require("path"),

        fs      = require("fs"),

        mime    = require("mime"),

        app     = express(),

        service = bs.config.service,

        ddport  = process.argv[2] || 8888;

        //app.use( session = session({ secret: 'secret' }) );

        /*app.use(function (req, res, next) 
        {
            var n = req.session.views || 0;

            req.session.views = ++n;

            next();

            //console.log( req.session );

            //res.end( n + ' views')
        })*/

        /*app.use( session = bs.session
        ({
            store   : new bs.session.store.mongodb
            ({
                host    : bs.config.mongodb.host,

                db      : bs.config.mongodb.database
            })
        }));*/

        /*app.use( function( req, res, next )
        {
            console.log( req.session.set( 'test', 'foo', 'bar' ) );

            console.log( req.session.get( 'test', 'foo' ) );

            next();
        });*/
    
        app.use( function( req, res, next )
        {
            process.nextTick(next);
        });

        app.use( session = bs.session
        ({
            secret  : "bookselling"
        }));
        
        und.each( bs.config.resources, function( resource, index )
        {
            app.use( resource[ 0 ], express.static( bs.config.dir.root + resource[ 1 ] ) );
        });

        app.use( function( req, res, next )
        {
            var uri         = url.parse( req.url ).pathname,

                segments    = uri.split( '/' ),

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

                        res
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
                else
                {
                    res.redirect( '/error/404' );
                }
            }
            else
            {
                next();
            }
        });
        
        app.use( bs.service );

        app.use( function( req, res, next )
        {
            res.redirect( '/error/404' );
        });

    bs.server =
    ({
        start   : function( port )
        {
            port    = parseInt( port || dport, 10 );

            console.info( 'Iniciando servidor HTTP puerto ' + port );

            bs.socket( app.listen( port ), session );
        },
        stop    : function()
        {
            console.info( 'Deteniendo servidor HTTP' );
        }
    }); 

})( BookSelling );


