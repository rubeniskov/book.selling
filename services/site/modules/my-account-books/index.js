module.exports = function($) {
    return ({

        __render: function(app) {
            var query = $.mysql.query("SELECT * FROM db_bookselling.v_books_uploaded where user_id=:user_id",
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
