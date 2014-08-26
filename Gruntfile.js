module.exports = function(grunt) {

    var pkg     = grunt.file.readJSON(  "package.json" );

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

    grunt.registerTask("default", [ "less", "cssmin", "concat", "uglify"]);

};