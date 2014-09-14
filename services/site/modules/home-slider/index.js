module.exports = function($) {
    return ({

        __render: function() {
          
            var query = $.mysql.query("SELECT *, CONCAT( LEFT( book_description, 500 ), '...' ) AS book_description_short FROM db_bookselling.v_books_purchased_top;");

            if (query.error) {
                return false;
            }

            return {
                books: query.result
            };
        }
    })
};
