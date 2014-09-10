module.exports = function( bs )
{
	var cart_items = 
	[
		{book_title:'La biblia', user_name: 'Jorge Alonso',book_uploaded_price: 21.5},
		{book_title:'La biblia2', user_name: 'Jorge Alonso',book_uploaded_price: 24.5},
		{book_title:'La biblia3', user_name: 'Jorge Alonso',book_uploaded_price: 11.5}
	];

	return ({
		__render : function()
		{
			return ({
				items: cart_items
			});
		},
		__ready : function( $ )
		{
			$( '[add-to-cart-book]', document.body ).click(function(e)
			{
				$.socket.emit('add',$(this).attr('add-to-cart-book'));

				$.socket.on('added', function()
				{
					$( 'table > tbody' ).append
					(
						'<tr>'+
				            '<td>'+
				                '<a href="/book/{{item.book_isbn}}">{{item.book_title}}</a>'+
				            '</td>'+
				            '<td>'+
				                '{{item.user_name}}'+
				            '</td>'+
				            '<td>'+
				                '{{item.book_uploaded_price}}'+
				            '</td>'+
				        '</tr>'
					);
				});
			});
		},
		events : 
		({

			'add': function( book_uploaded_id )
			{
				console.log(book_uploaded_id)

				var query = bs.mysql.query
				(
					'SELECT book_uploaded_id, book_uploaded_price, book_title, user_name FROM db_bookselling.v_books_uploaded ' +
					'LEFT JOIN db_bookselling.tb_users USING (user_id) WHERE book_uploaded_id = ' + book_uploaded_id
				);

				cart_items[book_uploaded_id] = query.result;

				this.emit( 'module-shopping-cart.added', cart_items );
			}
		})
	})
	
};