module.exports = function( bs )
{
	return ({

        __render : function( app )
        {   
            
        },
		__ready: function( $ ) 
		{

            $('#form-sign-in').submit(function(e) 
            {
            	e.preventDefault();

                var credential = $(this).serializeObject();

                $.socket.emit( 'sign-in', 
                {
                    user_email      : credential.user_email,

                    user_password   : $.md5( credential.user_password ) 
                });

                $.socket.on( 'success', function()
                {
                	console.log( 'TEST' );
                });
            });
        },
        events: ({
            'sign-in': function( credential ) 
            {
            	//this.request.session.user = bs.login.signIn( credential );

                //this.request.session.test = 'putaprueba';

                this.request.session.views -= 100;

                console.log( 'FROM SOCKET', this.request.session.views );

            	//bs.socket.emit( 'success' );
            }
        })
	})
	
};