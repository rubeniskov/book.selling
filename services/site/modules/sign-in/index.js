module.exports = function( bs )
{
	return ({
		__ready: function( $ ) 
		{

            $('#form-sign-in').submit(function(e) 
            {
                var credential = $(this).serializeObject();
                e.preventDefault();

                $.socket.emit( 'sign-in', 
                {
                    user_email      : credential.user_email,

                    user_password   :$.md5( user_password ) 
                });
            });
        },
        events: ({
            'sign-in': function( credential ) 
            {
            	bs.login.signIn( credential );
            }
        })
	})
	
};