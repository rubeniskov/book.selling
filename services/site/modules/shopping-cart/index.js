module.exports = function( bs )
{
	var und 		= require( 'underscore' ),

		getTotal 	= function( items )
		{
			var total = 0;
			
			und.each( items, function( item, ref )
			{
				total += item.book_uploaded_price;
			});

			return total;
		},
		getCount 	= function( items )
		{
			var count = 0;

			und.each( items, function( item, ref )
			{
				count ++;
			});

			return count;
		}

	return ({
		__ready : function( $ )
		{

			$( '[add-to-cart-book]', document.body ).click(function(e)
			{
				var btn 	= $(this);

				$.socket.emit( 'add', btn.attr( 'add-to-cart-book' ) );

				btn
					.unbind( 'click' )
					.css( 'background-color', '#efefef' )
					.text( 'Añadido' );
			});

			$.socket.on('change', function( books, count, total )
			{
				var table 	= $( 'table > tbody' ).empty();

				$.each( books, function( ref, book )
				{
					table.append
					(
						'<tr>'+
				            '<td>'+
				                '<a href="/book/' + book.book_isbn + '">' + book.book_title + '</a>'+
				            '</td>'+
				            '<td>'+
				                book.user_name+
				            '</td>'+
				            '<td>'+
				                book.book_uploaded_price+
				            '</td>'+
				            '<td>'+
				                '<a class="btn-sm btn-danger" remove-from-cart-book="'+ref+'"><i class="fa fa-minus"></i></a>'+
				            '</td>'+
				        '</tr>'
					);
				});

				$( '[remove-from-cart-book]' ).click( function()
				{
					var btn = $( this );

					btn.closest( 'tr' ).hide( 1000, function()
					{
						$.socket.emit( 'remove', btn.attr( 'remove-from-cart-book' ) );	
					})
				});	

				$( '[data-shopping-cart-total]', document.body ).text( total );

				$( '[data-shopping-cart-count]', document.body ).text( count );
			});

			$.socket.emit( 'refresh' );

		},
		events : 
		({

			'add' 		: function( book_uploaded_id )
			{
				var items 	= this.session.get( 'shopping-cart' ) || {},

					query 	= bs.mysql.query
				(
					'SELECT book_isbn, book_uploaded_id, book_uploaded_price, book_title, user_name FROM db_bookselling.v_books_uploaded ' +
					'LEFT JOIN db_bookselling.tb_users USING (user_id) WHERE book_uploaded_id = ' + book_uploaded_id
				),
					book 	= query.error || query.result[ 0 ];

				if( book )
				{
					items[ book.book_isbn + '-' + book.book_uploaded_id ] = book;

					this.session.set( 'shopping-cart', items );

					this.emit( 'change', items, getCount( items ), getTotal( items ) );
				}
			},
			'remove'  	: function( book_ref )
			{
				var items 	= this.session.get( 'shopping-cart' ) || {};

				delete items[ book_ref ];

				this.session.set( 'shopping-cart', items );

				this.emit( 'change', items, getCount( items ), getTotal( items ) );
			},
			'refresh' 	: function()
			{
				var items 	= this.session.get( 'shopping-cart' ) || {};

				this.session.set( 'shopping-cart', items );

				this.emit( 'change', items, getCount( items ), getTotal( items ) );
			}
		})
	})
	
};