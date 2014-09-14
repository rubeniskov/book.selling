module.exports = function(bs) 
{
    var und             = require( 'underscore' ),

        new_book        = function( book_data )
        {
            console.log( book_data );
            var query = bs.mysql.query
            (
                "INSERT INTO `tb_books`( `book_isbn`, `book_title`, `book_editorial`, `book_author`, `book_language`, `book_category`, `book_image`, `book_description`, `book_pages`, `book_price`) " +
                "VALUES( :book_isbn, :book_title, :book_editorial, :book_author, :book_language, :book_category, null, :book_description, :book_pages, :book_price )",
                book_data
            );

            return query;
        },

        new_user_book   = function( user_id, book_id, book_price )
        {
            var query = bs.mysql.query
            (
                "INSERT INTO `tb_books_uploaded`( `book_uploaded_price`, `user_id`, `book_id` ) VALUES( :book_price, :user_id, :book_id )",
                {
                    book_id     : book_id,

                    book_price  : book_price,

                    user_id     : user_id
                }
            );
            
            if( query.error )
            {
                switch( query.error.errno )
                {
                    case 1062:
                        query.error = 'El libro que intenta subir actualmente existe en su catálogo';
                    break;
                }
            }

            return query;
        };

    return ({
        __render: function() {
            
            var query = bs.mysql.query(" SELECT * FROM db_bookselling.v_books_categories;");

            if (query.error) {
                return false;
            }

            return {
                categories: query.result
            };
        },
        __ready: function($) {
            
            var book_fields         = 
            ({
                book_isbn: 
                {
                    message: 'ISBN no v&aacute;lido',

                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo IBSN no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 14,
                            max: 14,
                            message: 'El campo ISBN tiene que tener 14 car&aacute;cteres.'
                        },
                        regexp: 
                        {
                            regexp: /^[0-9\-]+$/,
                            message: 'El campo ha de tener el siguiente formato 000-0000000000'
                        }
                    }
                },

                book_price: 
                {
                    message: 'Campo precio no v&aacute;lido',
                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo precio no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 1,
                            max: 5,
                            message: 'El campo precio tiene que tener entre 3 y 30 car&aacute;cteres.'
                        },
                        regexp: 
                        {
                            regexp: /^[0-9. ]+$/,
                            message: 'Formato de precio no valido, Ej: 23.40'
                        }
                    }
                }
            });

            var new_book_fields     = 
            ({
                book_title: 
                {
                    message: 'Campo t&iacute;tulo no v&aacute;lido',

                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo t&iacute;tulo no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 3,
                            message: 'El campo t&iacute;tulo tiene que tener entre 3 y 30 car&aacute;cteres.'
                        },
                        regexp: 
                        {
                            regexp: /^[a-zA-Z0-9_ ]+$/,
                            //message: 'El campo t&iacute;tulo solo puede contener n&uacute;meros y letras.'
                        }
                    }
                },

                book_editorial: 
                {
                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo editorial no puede estar vac&iacute;a'
                        },
                        different: 
                        {
                            field: 'user_email',
                            message: 'El campo editorial no puede ser igual al campo email.'
                        },
                        stringLength: 
                        {
                            min: 6,
                            message: 'El campo editorial debe contener al menos 6 car&aacute;cteres.'
                        }
                    }
                },

                book_author: 
                {
                    message: 'Campo autor no v&aacute;lido',

                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo autor no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 3,
                            message: 'El campo autor tiene que tener entre 3 y 30 car&aacute;cteres.'
                        },
                        regexp: 
                        {
                            regexp: /^[a-zA-Z0-9_ ]+$/,
                            message: 'El campo autor solo puede contener  y letras.'
                        }
                    }
                },

                book_language: 
                {
                    message: 'Campo idioma no v&aacute;lido',

                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo idioma no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 3,
                            message: 'El campo idioma tiene que tener entre 3 y 30 car&aacute;cteres.'
                        },
                        regexp: 
                        {
                            regexp: /^[a-zA-ZÑñ0-9_ ]+$/,
                            message: 'El campo idioma solo puede contener letras.'
                        }
                    }
                },

                book_category: 
                {
                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'Debe seleccionar una.'
                        }
                    }
                },
                
                book_image: 
                {
                    validators: 
                    {
                        file: 
                        {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png,',
                            maxSize: 10 * 1024 * 1024, // 10 MB
                            message: 'La imágen seleccionada no es válida'
                        }
                    }
                },

                book_description: 
                {
                    message: 'Campo descripci&oacute;n no v&aacute;lido',
                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo descripci&oacute;n no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 3,
                            max: 2048,
                            message: 'El campo descripci&oacute;n tiene que tener mínimo 3 car&aacute;cteres.'
                        }
                    }
                },

                book_pages: 
                {
                    message: 'Campo n&uacutemero p&aacute;ginas no v&aacute;lido',
                    validators: 
                    {
                        notEmpty: 
                        {
                            message: 'El campo n&uacutemero p&aacute;ginas no puede estar vac&iacute;o'
                        },
                        stringLength: 
                        {
                            min: 1,
                            max: 4,
                            message: 'El campo n&uacutemero p&aacute;ginas tiene que tener entre 3 y 4 car&aacute;cteres.'
                        },
                        regexp: 
                        {
                            regexp: /^[0-9]+$/,
                            message: 'El campo páginas solo puede contener números.'
                        }
                    }
                }
            });
    
            var initValidator = function( fields )
            {
                $('#form-upload-book')
                    .bootstrapValidator( 'destroy' )
                    .bootstrapValidator
                    ({
                        message: 'Este valor no es v&aacute;lido',

                        feedbackIcons: 
                        {
                            valid: 'fa fa-ok',

                            invalid: 'fa fa-remove',

                            validating: 'fa fa-refresh'
                        },

                        fields: fields,

                        onSuccess : function( e )
                        {
                            $.socket.emit('upload-book', $('#form-upload-book').serializeObject());
                        }

                    });
            }

            $('#form-upload-book')
                .submit(function(e) 
                {
                    e.preventDefault();
                })
                .find( '.form-new-book' ).hide();

            initValidator( book_fields );

            var autocomplete = $('#form-upload-book input[data-search-book]')
                                .autocomplete( 'instance' );

            autocomplete.options.select = function( event, ui )
            {
                if( ui.item.value == 'new-book' )
                {
                    initValidator( $.extend( {},book_fields, new_book_fields ) );

                    $('#form-upload-book .form-new-book').slideDown( 1000 );

                    return false;
                }
                else
                {
                    initValidator( book_fields );

                    $('#form-upload-book .form-new-book').slideUp( 1000 );

                    $('#form-upload-book [name="book_price"]').val( ui.item.price );
                }
            }

            autocomplete.options.response = function( event, ui )
            {
                if (!ui.content.length) 
                    ui.content.push({ value : 'new-book',label : 'Añadir un nuevo libro' });
            }

            $.socket.on( 'success', function( message )
            {
                $( 'div.alert' )
                    .show()
                    .text( message )
                    .attr( 'class', 'alert alert-success' );

                $.redirect( '/my-account-books-list', 2000 );
            });

            $.socket.on( 'error', function( message )
            {
                $( 'div.alert' )
                    .show()
                    .text( message )
                    .attr( 'class', 'alert alert-danger' );
            });

            $( 'div.alert' )
                    .hide();

            $('#book-image').on('change', function(e)
            {
                var file    = e.originalEvent.target.files[0],

                    reader  = new FileReader();
                
                reader.onload = function(evt)
                {
                    $('#imageSelected').attr('src', evt.target.result);

                    $('#selectedImageConainer').css('display', '');

                    var phoneNum = $('#phoneNumber').val();
                    var jsonObject = 
                    {
                        'imageData': evt.target.result,
                        'imageMetaData': phoneNum
                    }
 
                    // send a custom socket message to server
                    //socket.emit('book-image', jsonObject);

                    console.log( jsonObject )
                };
                
                reader.readAsDataURL( file );
            });
        },
        events: 
        ({
            'upload-book': function(book_data) 
            {
                book_data = und.extend( book_data, this.session.get( 'user' ) );

                var query = bs.mysql.query
                (
                    "SELECT * FROM v_books WHERE book_isbn = :book_isbn",
                    book_data
                );

                if( !query.error )
                {
                    if( query.result.length > 0 && ( query.result = query.result[ 0 ] ) )
                    {
                        query = new_user_book( book_data[ 'user_id' ], query.result[ 'book_id' ], book_data[ 'book_price' ] );
                    }
                    else
                    {
                        query = new_book( book_data );
                        console.log( query );
                        if( !query.error )
                            query = new_user_book( book_data[ 'user_id' ], query.result[ 'book_id' ], book_data[ 'book_price' ] );
                    }
                }

                if( query.error )
                    this.emit( 'error', query.error.toString() );
                else
                    this.emit( 'success', 'Libro almacenado correctamente.' );

                    /*query = bs.mysql.query
                (
                    "INSERT INTO `tb_books`( `book_isbn`, `book_title`, `book_editorial`, `book_author`, `book_language`, `book_category`, `book_image`, `book_description`, `book_pages`, `book_price`) " +
                    "VALUES( :book_isbn, :book_title, :book_editorial, :book_author, :book_language, :book_category, null, :book_description, :book_pages, :book_price )",
                    book_data
                );

                console.log(query.error);*/
            }

        })
    })

};
