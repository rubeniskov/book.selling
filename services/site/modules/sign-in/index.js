module.exports = function( bs )
{
	return ({

        __render : function( app )
        {   
            
        },
		__ready: function( $ ) 
		{

            $( '#form-sign-in' ).submit(function(e) 
            {
            	e.preventDefault();

                var credential = $(this).serializeObject();

                $.socket.emit( 'sign-in', 
                {
                    user_email      : credential.user_email,

                    user_password   : $.md5( credential.user_password ) 
                });
            });

            $( '[data-cmd="logout"]', document.body ).click( function()
            {
                $.socket.emit( 'sign-out' );
            });

            $.socket.on( 'success', function()
            {
                $( 'div.alert' )
                    .text( 'Acceso satisfactorio.' )
                    .attr( 'class', 'alert alert-success' );

                $.redirect( '/my-account-profile-details', 2000 );
            });

            $.socket.on( 'error', function()
            {
                $( 'div.alert' )
                    .text( 'Puede que el email o la contraseña sean erróneos.' )
                    .attr( 'class', 'alert alert-danger' );
            });

            $.socket.on( 'sign-out', function()
            {
                $.redirect( '/home' );
            });
        },
        events: 
        ({
            'sign-in': function( credential ) 
            {
                var user;

                if( ( user = bs.login.signIn( credential ) ) )
                {
                    this.session.set( 'user', user );
                    
                    this.emit( 'success' );
                }
                else
                    this.emit( 'error' );
            },
            'sign-out': function( credential ) 
            {
                this.request.session.delete();

                this.emit( 'sign-out' );
            }
        })
	})
	
};