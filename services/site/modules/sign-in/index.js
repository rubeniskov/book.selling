module.exports = function( bs )
{
	return ({
		__ready: function( $ ) 
		{

            $('#form-sign-in').submit(function(e) 
            {
                e.preventDefault();

                $.socket.emit( 'sign-in', $(this).serializeObject() );
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