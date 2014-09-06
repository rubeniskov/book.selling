module.exports = function($) {
    return ({

        __render: function(app) {
            //var query = $.mysql.query("SELECT * FROM db_bookselling.v_books;");
            var category = app.segments[0];
            var query = $.mysql.query("SELECT * FROM db_bookselling.v_books_available WHERE book_category=:book_category",{book_category : category});



            if (query.error) {
                return false;
            }

            return {
                books: query.result,
                category: category
            };
        }
    })
};
