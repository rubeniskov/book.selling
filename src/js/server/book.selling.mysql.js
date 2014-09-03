(function( bs ){

    var mysql       = require("mysql"),

        deasync     = require('deasync'),

        connection  = mysql.createConnection( bs.config.mysql );
        

        connection.connect( function( err ) 
        {
            if (err) 
            {
                console.error('Error de conexión a MySql: ' + err.stack);
                return;
            }   

            console.log('Conectado a MySql como ' + bs.config.mysql.user + ' a ' + bs.config.mysql.host + ' ID [' + connection.threadId + ']' );
        }); 

        connection.config.queryFormat = function (query, values) 
        {
            if (!values) return query;

            return query.replace(/\:(\w+)/g, function (txt, key) 
            {
                if (values.hasOwnProperty(key)) 
                {
                    return this.escape(values[key]);
                }
                
                return txt;
            }.bind(this));
        };

    bs.mysql     = 
    ({
        query : function( sql, values )
        {
            
            var current     = 0

                delay       = 100,

                timeout     = 10000, 

                sync        = false;

            connection.query
            ({
                sql         : sql, 

                values      : values,

                timeout     : timeout
            }, 
            function( err, result, fields )
            {
                sync = 
                ({ 
                    error   : err, 

                    result  : result, 

                    fields  : fields 
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
        }
    });

})( BookSelling );


