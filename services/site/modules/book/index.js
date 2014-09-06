module.exports = function($) {
    return ({
        __render: function(app) {
            var isbn = app.segments[0];

            var query = $.mysql.query("SELECT * FROM v_books WHERE book_isbn = :book_isbn", {book_isbn : isbn});

            if (query.error) {
                return false;
            }

            return {
                book: query.result[0]
            };
        }

    })
};
