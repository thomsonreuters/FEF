// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        typescript: {
            base: {
                src: [
                    '<%= yeoman.app %>/js/{,**/}*.ts'
                ],
                dest: '<%= yeoman.app %>/js/generated/fruitapp.js',
                options: {
                    target: 'es5',
                    sourceMap: true,
                    comments: true,
                    noImplicitAny: false
                }
            }
        },

        html2js: {
          options: {
              base: '<%= yeoman.app %>/',
              module: 'fruit-1x-templates'
          },
          main: {
              src: ['<%= yeoman.app %>/js/**/*html'],
              dest: '<%= yeoman.app %>/js/fruit-1x-temp.js'
          }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/js/{,*/}*.js'],
                tasks: [],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less:server'],
                options: {
                    livereload: '<% connect.options.livereload %>'
                }
            },
            ts: {
                files: ['<%= yeoman.app %>/js/{,**/}*.ts'],
                tasks: ['typescript:base'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9001,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            proxies: [{
                context: '/rest',
                port: 8081,
                host: 'localhost',
                headers: {
                    'host': 'localhost'
                },
                changeOrigin: true,
                rewrite: {
                    '^/rest': ''
                }
            }],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        middlewares.push(connect.static('.tmp'));
                        middlewares.push(connect().use('/bower_components', connect.static('./bower_components')));
                        middlewares.push(connect.static(appConfig.app));

                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,**/}*.js',
                '!<%= yeoman.app %>/js/batmobiles-1x-temp.js',
                '!<%= yeoman.app %>/js/generated/ts/{,**/}*.js'
                ]
            },
            test: {
                src: [
                    'test/spec/{,*/}*.js',
                    '!test/spec/generated/ts/{,**/}*.js'
                ]
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: [
                    '<%= yeoman.app %>/js/{,**/}*.ts',
                    'test/spec/{,**/}*.ts'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            options: {
                force:true
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/js/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/batmobiles-1x.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },

        uglify: {
            generated: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                }
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'js/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngAnnotate tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: '.tmp/concat/js'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'js/**/*.html',
                        'images/{,*/}*.{webp}',
                        'languages/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },

            modDist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'languages/**/*'
                    ]
                }]
            },

            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                // 'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: false
            }
        },

        protractor: {
            options: {
                keepAlive: true,
                configFile: 'test/protractor.conf.js'
            },
            run: {}
        },

        less: {
            options: {
                paths: '<%= yeoman.app%>/styles'
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app%>/styles',
                    src: ['*.less'],
                    dest: '<%= yeoman.app%>/styles',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app%>/styles',
                    src: ['*.less'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

        grunt.task.run(['typescript']);

        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',            
            'configureProxies:server',
            'concurrent:server',
            'less:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        
        'concurrent:test',
        'less:server',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('e2e', [
        'clean:server',
        'concurrent:test',
        'less:server',
        'autoprefixer',
        'connect:test',
        'protractor:run'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'less:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};