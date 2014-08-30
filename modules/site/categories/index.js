module.exports = function( $ )
{
	return ({
		__render : function()
		{
			var query 	= $.mysql.query( "SELECT * FROM tb_books" );

			if( query.error )
			{
				return false;
			}

			return { books : query.result };
		},
		__ready   : function( $ )
		{
			var recent = $("#owl-recent");
	 
		recent.owlCarousel
		({
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			items : 4,
			mouseDrag : false,
			pagination : false
		});
	
	$(".next").click(function(){
			recent.trigger('owl.next');
	  })
	  
	  $(".prev").click(function(){
			recent.trigger('owl.prev');
	  })
			/*$( 'div' ).css('background-color', 'red' );*/
		}
	})
	
};



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