module.exports = function($) {
    return ({
        __render: function(app) {
            var isbn    = app.segments[0],

                details = $.mysql.query('SELECT *FROM db_bookselling.v_books_uploaded WHERE book_isbn = :book_isbn', {book_isbn : isbn}),

                books   = $.mysql.query('SELECT *, DATE_FORMAT(book_uploaded_date, "%d-%m-%Y") AS book_uploaded_date_formatted  FROM db_bookselling.v_books_uploaded LEFT JOIN db_bookselling.tb_users USING (user_id) WHERE book_isbn = :book_isbn ORDER BY book_uploaded_price', {book_isbn : isbn});  

            if (details.error || books.error) {
                return false;
            }

            return {
                details: details.result[0],
                books: books.result
            };
        }

    })
};
