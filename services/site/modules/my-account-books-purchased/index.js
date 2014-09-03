module.exports = function($) {
    return ({

        __render: function( app ) {
            var i, purchases,

            query = $.mysql.query("SELECT *, DATE_FORMAT( purchase_date, '%d-%m-%Y') AS purchase_date_formatted FROM db_bookselling.tb_purchases WHERE user_id=:user_id", { user_id : app.user.user_id });
            //var query2 	= $.mysql.query( "SELECT * FROM db_bookselling.tb_books_purchased;" );

            if (query.error) {
                return false;
            };

            for (i = 0, purchases = query.result; i < purchases.length; i++) {
                query = $.mysql.query("SELECT * FROM db_bookselling.v_books_purchased WHERE purchase_id = :purchase_id;", purchases[i])

                if (query.error) {
                    return false;
                }

                purchases[i].books = query.result;
            };

            return ({

                purchases: purchases

            });
        }
    })
};
