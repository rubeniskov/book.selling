module.exports = function($) {
    return ({

        __render: function() {
            //var query = $.mysql.query("SELECT * FROM db_bookselling.v_categories;";");
            var query = $.mysql.query(" SELECT * FROM db_bookselling.v_books_categories;");




            if (query.error) {
                return false;
            }

            return {
                categories: query.result
            };
        }
    })
};
