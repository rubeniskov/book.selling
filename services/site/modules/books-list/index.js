module.exports = function($) {
    return ({

        __render: function( app ) {
            
            var sort    = app.params.sort || 'book_title|desc',

                sort    = sort.split( '|' );

            var query   = $.mysql.query('SELECT * FROM db_bookselling.v_books_available ORDER BY '+ sort[ 0 ] +' ' + sort[ 1 ] + '; ');



            if (query.error) {
                return false;
            }

            return {
                books: query.result
            };
        },
        __ready: function($){

            var form = $("form[name=book-order-form]");

            form.find( 'select' ).change(function(e){ 

                form.submit();
            })   
        }
    })
};
