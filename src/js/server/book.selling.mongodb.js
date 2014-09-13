(function( bs ){

    var mongodb     = require("mongodb"),

        deasync     = require('deasync'),

        und         = require('underscore'),

        database    = null,

        connection  = new mongodb.Server( bs.config.mongodb.host, bs.config.mongodb.port );

        connection  = new mongodb.Db( bs.config.mongodb.database , connection, { safe : false }); 

    bs.mongodb      = 
    ({
        collection : function( name )
        {
            var collection  = new mongodb.Collection(database, name),

                factory     =
                ({
                    find : function()
                    {
                        var current     = 0

                            delay       = 10,

                            timeout     = 10000, 

                            sync        = false;

                        collection.find.apply( collection, arguments ).toArray(function( err, result, fields )
                        {
                            sync = 
                            ({ 
                                error   : err, 

                                result  : result
                            });
                        });    

                        while( !sync )
                        {
                            deasync.sleep( delay );

                            if( current > timeout )
                            {
                                sync = 
                                ({ 
                                    error       : { code : 'TIMEOUT' }
                                });

                                break;
                            }

                            current += delay;
                        }

                        return sync;
                    },
                    update  : function()
                    {
                        return collection.update.apply( collection, arguments );
                    },

                    insert  : function()
                    {
                        return collection.insert.apply( collection, arguments );
                    },

                    remove  : function()
                    {
                        return collection.remove.apply( collection, arguments );  
                    },

                    save    : function()
                    {
                        return collection.save.apply( collection, arguments );  
                    },

                    replace : function( find, insert)
                    {
                        var found    = factory.find( find );

                        if( !found.error )
                        {
                            if( found.result.length > 0 )
                            {
                                return factory.update( find, insert );
                            }
                            else
                            {
                                return factory.insert( und.extend( find, insert) );
                            }
                        }

                        console.log( 'MongoDB: ' + found.error );

                        return false;
                    }
                });

            return factory;
        },
        start   : function()
        {
            console.info( 'Iniciando conexión a MongoDB');

            connection.open( function( err, db ) 
            {
                if (err) 
                {
                    console.error('Error de conexión a MongoDB: ' + err.stack);
                    return;
                }   

                console.log('Conectado a MongoDB host ' + bs.config.mongodb.host );

                database = db;
            });
        },
        stop    : function()
        {
            console.info( 'Deteniendo conexión a MongoDB' );

            connection.close( function(err) 
            {
                database = null;

                console.info( 'Conexión a MongoDB detenida' );
            });
        }
    });

})( BookSelling );


