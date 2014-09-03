module.exports = function($) {
    return ({

        __render: function() {
            var query = $.mysql.query("SELECT * FROM tb_books");

            if (query.error) {
                return false;
            }

            return {
                books: query.result
            };
        }
    })
};
