module.exports = function($) {
    return ({

        __render: function( app ) {
            
            var psort           = ( app.params.sort || 'book_title|desc' ).split( '|' ),

                ppage           = ( app.params.page || '1|6' ).split( '|' ),

                page            = Math.max( parseInt( ppage[ 0 ] ), 1 ),

                page_items      = Math.max( parseInt( ppage[ 1 ] ), 1 ),

                pages           = 1,

                count           = $.mysql.query('SELECT COUNT(0) AS book_count FROM db_bookselling.v_books_available' ),

                query           = $.mysql.query('SELECT * FROM db_bookselling.v_books_available ORDER BY '+ psort[ 0 ] + ' ' + psort[ 1 ] + ' LIMIT ' + ( page_items * ( page - 1 ) ) + ',' + page_items);

            if (count.error || query.error) 
            {
                return false;
            }
                pages           = Math.ceil( count.result[ 0 ][ 'book_count' ] / page_items );

            return {
                books       : query.result,

                page        : page,

                pageitems   : page_items,

                pages       : pages
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
