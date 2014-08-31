module.exports = function( $ )
{
	return ({
		__render : function()
		{
			var query 	= $.mysql.query( "SELECT * FROM v_books limit 0,8" );
			var query2 	= $.mysql.query( "SELECT * FROM v_books_available" );
			var query3	= $.mysql.query( "SELECT * FROM v_books_purchased_last" );
		;

			if( query.error )
			{
				return false;
			}

			return ({ 	carousel : query.result,
						books  : query2.result,
						purchase_last: query3.result
					});
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