module.exports = function( $ )
{
	return ({
		__render : function()
		{
			
		},
		__ready   : function( $ )
		{
			
			/*$( 'div' ).css('background-color', 'red' );*/
		}

		/*function( socket, name, data )
		{
			var msg;

			switch( name )
			{
				case 'sign-up':
					$.login.signUp( data, function( err )
					{
						if( err )
						{
							switch( err.code )
							{
								case 'ER_DUP_ENTRY':
									msg = 'Usuario ya existente';
								break
							}

							return socket.emit( 'msg', { msg : 'Usuario ya existente' } );
						}

						socket.emit( 'msg', { msg : "Usuario registrado con &eacute;xito" } );
					});
				break;
				case 'sign-in':
					$.login.signIn( data );
				break;
				case 'sign-out':
					$.login.signOut( data );
				break;
			};
		}*/
	})
};