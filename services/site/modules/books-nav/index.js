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
        },

        __ready: function( $ )
        {
            $( 'li[rel]' ).each(function()
            {
                ( new RegExp( $(this).attr( 'rel' ) ) ).test( window.location.href ) && $(this).addClass( 'active' );
            })
        }
    })
};
