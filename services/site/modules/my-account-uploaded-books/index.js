module.exports = function(bs) {
    return ({
        __ready: function($) {
            $.socket.on('msg', function(data) {
                $('.alert').text(data.msg).addClass('alert-danger').show();
            });

            $('#form-update-book').bootstrapValidator({
                message: 'Este valor no es v&aacute;lido',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',

                    invalid: 'glyphicon glyphicon-remove',

                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    user_name: {
                        message: 'Nombre de usuario no v&aacute;lido',

                        validators: {
                            notEmpty: {
                                message: 'El campo nombre no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                max: 30,
                                message: 'El campo nombre tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_]+$/,
                                message: 'El campo usuario solo puede contener n&uacute;meros y letras.'
                            }
                        }
                    },

                    user_surname: {
                        message: 'Campo apellidos no v&aacute;lido',

                        validators: {
                            notEmpty: {
                                message: 'El campo apellidos no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                max: 30,
                                message: 'El campo apellidos tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_]+$/,
                                message: 'El campo apellidos solo puede contener n&uacute;meros y letras.'
                            }
                        }
                    },

                    user_password: {
                        validators: {
                            notEmpty: {
                                message: 'La contrase&ntilde;a no puede estar vac&iacute;a'
                            },
                            different: {
                                field: 'user_email',
                                message: 'La contrase&ntilde;a no puede ser igual al campo email.'
                            },
                            stringLength: {
                                min: 6,
                                message: 'La contrase&ntilde;a debe contener al menos 6 car&aacute;cteres.'
                            }
                        }
                    },

                    user_email: {
                        validators: {
                            notEmpty: {
                                message: 'El campo email no puede estar vac&iacute;o.'
                            },
                            emailAddress: {
                                message: 'El campo introducido no es un email.'
                            }
                        }
                    },

                    user_birthdate: {
                        validators: {
                            notEmpty: {
                                message: 'La fecha de nacimiento no puede estar vac&iacutea;'
                            },
                            date: {
                                format: 'YYYY-MM-DD',
                                message: 'La fecha de nacimiento no es v&aacute;lida.Formato YYYY-MM-DD'
                            }
                        }
                    },

                    user_sex: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar uno'
                            }
                        }
                    },

                    user_phone: {
                        message: 'Campo tel&eacute;fono no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo tel&eacute;fono no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 9,
                                max: 9,
                                message: 'El campo tel&eacute;fono tiene que tener 9 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[0-9]+$/,
                                message: 'El campo tel&eacute;fono solo puede contener n&uacute;meros .'
                            }
                        }
                    },

                    user_address: {
                        message: 'Campo direcci&oacute;n no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo direcci&oacute;n no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 6,
                                max: 30,
                                message: 'El campo direcci&oacute;n tiene que tener entre 3 y 30 car&aacute;cteres.'
                            }
                        }
                    },

                    user_cp: {
                        message: 'Campo c&oacute;digo postal no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo c&oacute;digo postal no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 5,
                                max: 5,
                                message: 'El campo c&oacute;digo postal tiene que tener  5 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[0-9]+$/,
                                message: 'El campo c&oacute;digo postal solo puede contener n&uacute;meros .'
                            }
                        }
                    },

                    user_state: {
                        message: 'Provincia no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo provincia no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                max: 30,
                                message: 'El campo provincia tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZñÑ]+$/,
                                message: 'El campo provincia solo puede contener letras.'
                            }
                        }
                    },

                    user_country: {
                        message: 'Pa&iacute;s no v&aacute;lido',
                        validators: {
                            notEmpty: {
                                message: 'El campo pa&iacute;s no puede estar vac&iacute;o'
                            },
                            stringLength: {
                                min: 3,
                                max: 30,
                                message: 'El campo pa&iacute;s tiene que tener entre 3 y 30 car&aacute;cteres.'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZñÑ]+$/,
                                message: 'El campo pa&iacute;s solo puede contener   letras.'
                            }
                        }
                    }
                }
            })
           .submit(function(e) {
                e.preventDefault();

                $.socket.emit( 'update-book', $(this).serializeObject() );
            });
        },
        events: ({
            'upload-book': function() {

            }

        })
    })

};
