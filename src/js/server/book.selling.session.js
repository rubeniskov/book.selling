(function(bs) {

    var cookies     = require('cookies'),

        und         = require('underscore'),

        base64      = require('base64'),

        md5         = require('MD5');

    bs.session = function session( options ) 
    {
        var options         = options           || {},
            key             = options.key       || 'ssid',
            sessionID       = options.ssid

        return function session( req, res,  next ) 
        {
            if( req.session ) return next();

            if( !req.cookies )
                req.cookies = new cookies( req, res, [ 'bookselling' ] );

            var ssid    =  req.cookies.get( key ) || sessionID;

            if( !ssid )
                req.cookies.set( key, ssid = bs.utils.uid( 32 ) )

            req.session = ({
                get : function( key )
                {
                    var query = bs.mongodb.collection( 'tb_session' ).find({ _id : md5( ssid + key ) }),

                        value = !query.error && query.result.length > 0 ? query.result[ 0 ].session_value : false;

                    //console.log( 'Getting Session Var SSID ' + ssid + ' ['+ key +'](' + JSON.stringify( value ) + ')' );

                    return value
                },
                set : function( key, value )
                {
                    //console.log( 'Setting Session Var SSID ' + ssid + ' ['+ key +'](' + JSON.stringify( value ) + ')' );

                    bs.mongodb.collection( 'tb_session' ).replace({ _id : md5( ssid + key ) }, { session_ssid : ssid, session_key : key, session_value : value });

                    return value;
                },
                delete : function()
                {
                    console.log( 'Deletting Session Var SSID ' + ssid );

                    bs.mongodb.collection( 'tb_session' ).remove({ session_ssid : ssid });
                }                
            });

            

            next();
        };
    };

})(BookSelling);


