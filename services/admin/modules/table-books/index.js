module.exports = function(bs) {
    return ({
        __render: function() {
            var query = bs.mysql.query("SELECT * FROM tb_books");

            if (query.error) {
                return false;
            }

            return {
                books: query.result
            };
        },
        __ready: function($) {

        	$('[data-item-cmd]').click(function()
        	{
                var btn    = $( this );

                btn.closest( 'tr' ).hide( 1000, function()
                {
                    $.socket.emit( btn.attr( 'data-item-cmd' ), btn.attr( 'data-item-id' ) );
                });
        	});
        },
        events: 
        ({
            'remove-item': function( book_id ) 
            {
               	var query = bs.mysql.query( "DELETE FROM db_bookselling.tb_books WHERE book_id=" + book_id );

                console.log( query );
            	
            }

        })
    })

};
