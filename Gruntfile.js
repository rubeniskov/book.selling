module.exports = function(grunt) {

    var walk        = require('walk'),

        und         = require("underscore"),

        path        = require("path"),

        fs          = require("fs"),
        
        pkg         = grunt.file.readJSON(  "package.json" ),
        
        files       = [],

        compileModules  = function() 
        {
            var modules, views, m_script,

                services    = fs.readdirSync( './services' );

            pkg.services    = {};

            services = 

            und.each
            ( 
                und.filter( services, function( service )
                {
                    return !( /^\.+/ ).test( service );
                }), 
                function( service )
                {
                    modules     = fs.readdirSync( path.join( './services', service, 'modules' ) );

                    views       = fs.readdirSync( path.join( './services', service, 'views' ) );

                    pkg.services[ service ] = 
                    ({
                        modules : {},

                        views   : []
                    });
                    
                    und.each
                    ( 
                        und.filter( modules, function( module )
                        {
                            return !( /^\.+/ ).test( module );
                        }),
                        function( module )
                        {
                            m_script        = path.join( __dirname, 'services', service, 'modules', module, 'index.js' )

                            pkg.services[ service ][ 'modules' ][ module ] = 
                            ({
                                events : []
                            });

                            if( fs.existsSync( m_script ) && ( m_script = require( m_script ) ) )
                            {
                                ( m_script = m_script() ) && m_script.events && und.each( m_script.events, function( fn, e_name )
                                {
                                    pkg.services[ service ][ 'modules' ][ module ][ 'events' ].push( e_name );
                                });
                            }
                            
                        }
                    );

                    und.each
                    ( 
                        und.filter( views, function( view )
                        {
                            return !( /^\.+/ ).test( view );
                        }),
                        function( view )
                        {
                            pkg.services[ service ][ 'views' ].push( view.replace( '.html', '' ) );
                        }
                    );
                }
            );
    
            if( fs.writeFileSync("./package.json",  JSON.stringify( pkg, null, 4 )) );
            {
                console.log( 'Package.json saved!' );
            }
        };

    grunt.initConfig
    ({
        pkg: pkg,
        
        less: 
        {
            core: 
            {
                files: 
                {
                    '<%= pkg.destination %>/<%= pkg.alias %>.css': 'src/less/book.selling.less'
                }
            }
        },

        concat: 
        {
            options: 
            {
                separator       : ";",

                process: function(src, filepath)
                {
                    return '\n\n// Filename: ' + filepath + '\n\n' + src;
                },

                stripBanners    : true,
                banner          : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                                  '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
            },
            client: 
            {
                src: pkg.sources.client,
                dest: "<%= pkg.destination %>/<%= pkg.alias %>.js"
            },
            server: 
            {
                src: pkg.sources.server,
                dest: "node_modules/book-selling/index.js"
            }
        },

        uglify: 
        {

            options: 
            {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
            },
            core: 
            {
                files: 
                {
                    "<%= pkg.destination %>/<%= pkg.alias %>.min.js": ["<%= concat.client.dest %>"],
                }
            }
        },

        cssmin: 
        {
            options: 
            {
                compatibility: "ie8",
                keepSpecialComments: "*",
                noAdvanced: true
            },
            core: 
            {
                files: 
                {
                    "<%= pkg.destination %>/<%= pkg.alias %>.min.css": "<%= pkg.destination %>/<%= pkg.alias %>.css",
                }
            }
        },

        watch: 
        {
            css:
            {
                files: [ "**/*.less" ],
                tasks: [ "less" ]
            },
            js:
            {
                files: [ pkg.sources.client,pkg.sources.server ],
                tasks: [ "concat" ]
            }
        }
    });

    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-less" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );

    grunt.registerTask("default", [ "less", "cssmin", "concat", "uglify" ]);

    console.log( 'Compile Modules' );

    compileModules();    

};