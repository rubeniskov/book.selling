module.exports = function($) {
    return ({

        __render: function() {
            //var query = $.mysql.query("SELECT * FROM db_bookselling.v_books;");
            var query = $.mysql.query("SELECT * FROM db_bookselling.v_books_available;");



            if (query.error) {
                return false;
            }

            return {
                books: query.result
            };
        }
    })
};
