module.exports = function(bs) {
    return ({

        __ready: function($) {
            $.socket.on('msg', function(data) {
                $('.alert').text(data.msg).addClass('alert-danger').show();
            });

            $('#form-upload-book').bootstrapValidator({
                message: 'Este valor no es v&aacute;lido',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',

                    invalid: 'glyphicon glyphicon-remove',

                    validating: 'glyphicon glyphicon-refresh'
                },



                fields: {
                    book_isbn: {
                        message: 'ISBN no v&aacute;lido',

                        validators: {
                            notEmpty: {
                                message: 'El campo IBSN no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 13,
                                max: 13,
                                message: 'El campo ISBN tiene que tener 13 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[0-9]+$/,
                                message: 'El campo usuario solo puede contener n&uacute;meros.'
                            }
                        }
                    },

                    book_title: {
                        message: 'Campo t&iacute;tulo no v&aacute;lido',

                        validators: {
                            notEmpty: {
                                message: 'El campo t&iacute;tulo no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                message: 'El campo t&iacute;tulo tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_ ]+$/,
                                //message: 'El campo t&iacute;tulo solo puede contener n&uacute;meros y letras.'
                            }
                        }
                    },

                    book_editorial: {
                        validators: {
                            notEmpty: {
                                message: 'El campo editorial no puede estar vac&iacute;a'
                            },
                            different: {
                                field: 'user_email',
                                message: 'El campo editorial no puede ser igual al campo email.'
                            },
                            stringLength: {
                                min: 6,
                                message: 'El campo editorial debe contener al menos 6 car&aacute;cteres.'
                            }
                        }
                    },

                    book_author: {
                        message: 'Campo autor no v&aacute;lido',

                        validators: {
                            notEmpty: {
                                message: 'El campo autor no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                message: 'El campo autor tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_ ]+$/,
                                message: 'El campo autor solo puede contener  y letras.'
                            }
                        }
                    },

                    book_language: {
                        message: 'Campo idioma no v&aacute;lido',

                        validators: {
                            notEmpty: {
                                message: 'El campo idioma no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                message: 'El campo idioma tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÑñ0-9_ ]+$/,
                                message: 'El campo idioma solo puede contener letras.'
                            }
                        }
                    },

                    book_category: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar una.'
                            }
                        }
                    },
                    /*book_image: {
                        validators: {
                            notEmpty: {
                                message: 'Debe subir una.'
                            }
                        }
                    },*/

                    book_description: {
                        message: 'Campo descripci&oacute;n no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo descripci&oacute;n no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                max: 150,
                                message: 'El campo descripci&oacute;n tiene que tener 9 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_ ]+$/,
                                //message: 'El campo descripci&oacute;n solo puede contener n&uacute;meros .'
                            }
                        }
                    },

                    book_pages: {
                        message: 'Campo n&uacutemero p&aacute;ginas no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo n&uacutemero p&aacute;ginas no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 1,
                                max: 4,
                                message: 'El campo n&uacutemero p&aacute;ginas tiene que tener entre 3 y 30 car&aacute;cteres.'
                            }
                        }
                    },

                    book_price: {
                        message: 'Campo precio no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo precio no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 1,
                                max: 4,
                                message: 'El campo precio tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[0-9_,. ]+$/,
                                //message: 'El campo descripci&oacute;n solo puede contener n&uacute;meros .'
                            }
                        }
                    }
                }
            }).submit(function(e) {
                    e.preventDefault();

                    $.socket.emit('upload-book', $(this).serializeObject());
                });

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
        events: ({
            'upload-book': function(book_data) {
                console.log( book_data );
                var query = bs.mysql.query(

                    "INSERT INTO `tb_books`( `book_isbn`, `book_title`, `book_editorial`, `book_author`, `book_language`, `book_category`, `book_image`, `book_description`, `book_pages`, `book_price`) " +
                    "VALUES( :book_isbn, :book_title, :book_editorial, :book_author, :book_language, :book_category, null, :book_description, :book_pages, :book_price )",
                    book_data
                );

                console.log(query.error);
            }

        })
    })

};
