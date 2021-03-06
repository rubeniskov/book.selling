module.exports = function($) {

    var und         = require( 'underscore' ),

        setBookCart = function( cart, books )
        {
            und.each( books, function( book )
            {
                book.book_in_cart = !( cart[ book.book_isbn + '-' + book.book_uploaded_id ] )
            });

            return books;
        };

    return ({

        __render: function( app, attr ) {
            //WHERE book_category=:
            
            var sections        =
                {
                    "home"      : 
                    { 
                        table : "v_books_available"
                    },
                    "list"      : 
                    { 
                        table : "v_books_available"
                    },
                    "news"      : 
                    { 
                        table : "v_books_available_new"
                    },
                    "search"    : 
                    { 
                        table : "v_books_available"
                    },
                    "category"  : 
                    { 
                        table : "v_books_available",

                        where : app.segments[ 0 ] ? 'book_category_normalize = "' + app.segments[0] + '"' : '1'
                    }
                },

                section         = sections[ attr.section || "list" ],

                psort           = ( app.params.sort || 'book_title|desc' ).split( '|' ),

                ppage           = ( app.params.page || '1|6' ).split( '|' ),

                page            = Math.max( parseInt( ppage[ 0 ] ), 1 ),

                page_items      = Math.max( parseInt( ppage[ 1 ] ), 1 ),

                pages           = 1,

                count           = $.mysql.query('SELECT COUNT(0) AS book_count FROM db_bookselling.' + section.table + ( section.where ? ' WHERE ' + section.where : '' ) ),

                query           = $.mysql.query('SELECT * FROM db_bookselling.'+ section.table + ( section.where ? ' WHERE ' + section.where : '' ) + ' ORDER BY '+ psort[ 0 ] + ' ' + psort[ 1 ] + ' LIMIT ' + ( page_items * ( page - 1 ) ) + ',' + page_items);

            if (count.error || query.error) 
            {
                return false;
            }
                pages           = Math.ceil( count.result[ 0 ][ 'book_count' ] / page_items );

            return {
                books       : setBookCart( app.session.get( 'shopping-cart' ) || {}, query.result ),

                page        : page,

                pageitems   : page_items,

                pages       : pages,

                section     : section
            };
        },
        __ready: function($){

            var form = $("form[name=book-order-form]");

            form.find( 'select' ).change(function(e){ 

                window.location.href = window.location.href + '?' + $( this ).val();
            })   
        }
    })
};
