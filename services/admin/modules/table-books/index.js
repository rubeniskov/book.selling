module.exports = function($) {
    return ({
        __render: function() {
            var query = $.mysql.query("SELECT * FROM tb_books");

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

        		$.socket.emit( btn.attr( 'data-item-cmd' ),btn.attr( 'data-item-id' ) );

                setInterval( function()
                {
                    window.location.href = window.location.href;
                }, 200);
        	});
        },
        events: ({
            'remove-item': function( book_id ) 
            {
               	var query = $.mysql.query( "DELETE FROM db_bookselling.tb_books WHERE book_id=" + book_id );
            	
            }

        })
    })

};
