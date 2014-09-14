module.exports = function($) {
    return ({

        __render: function(app) {
            var query = $.mysql.query( 'SELECT *, DATE_FORMAT(book_uploaded_date, "%d-%m-%Y") AS book_uploaded_date_formatted FROM db_bookselling.v_books_uploaded where user_id=:user_id ORDER BY book_uploaded_date DESC',
                { 
                    user_id : app.user.user_id 
                });



            if (query.error) {
                return false;
            }

            return {
                books: query.result
            };
        }
    })
};
