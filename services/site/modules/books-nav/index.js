module.exports = function($) {
    return ({

        __render: function() {
            //var query = $.mysql.query("SELECT * FROM db_bookselling.v_books;");
            var query = $.mysql.query(" SELECT distinct book_category FROM db_bookselling.v_books ;");




            if (query.error) {
                return false;
            }

            return {
                categories: query.result
            };
        }
    })
};
