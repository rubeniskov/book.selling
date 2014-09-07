module.exports = function($) {

    var label_status = 
        ({
            'en-proceso'    : 'primary',
            'entregado'     : 'success',
            'en-envio'      : 'warning',
            'error'         : 'danger'
        });

    return ({

        __render: function( app ) 
        {
            var i, purchases, status,

                query   = $.mysql.query('SELECT *, DATE_FORMAT( purchase_date, "%d-%m-%Y") AS purchase_date_formatted FROM db_bookselling.v_purchases WHERE user_id=:user_id', { user_id : app.user.user_id });

            if (query.error) {
                return false;
            };

            for (i = 0, purchases = query.result; i < purchases.length; i++) {
                query = $.mysql.query('SELECT * FROM db_bookselling.v_books_purchased WHERE purchase_id = :purchase_id;', purchases[i])

                if (query.error) {
                    return false;
                }

                status  = ( purchases[i][ 'purchase_status' ] || 'error' ).toLowerCase().replace( /\s/, '-' )
            
                purchases[i].label_status = label_status[ status ] || 'danger';

                purchases[i].books = query.result;
            };
            
            return ({

                purchases: purchases

            });
        },
        __ready     : function( $ )
        {
            $( '[data-show]').click( function( e )
            {
                var btn     = $( this );

                $( '[data-table='+  btn.attr( 'data-show' ) +']' ).toggleClass( 'hide' );
            })
        }
    })
};
