module.exports = function($) {
    return ({
        __render: function() {
            var query = $.mysql.query("SELECT * FROM tb_books WHERE book_id = 2");

            if (query.error) {
                return false;
            }

            return {
                book: query.result[0]
            };
        }

    })
};
