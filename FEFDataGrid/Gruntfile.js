//function to configure options for the connect static http server
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
//function to configure options for the connect static http server
var showDirectory = function(connect, dir) {
    return connect.directory(dir);
};

//handle single path
//handle n paths
//add watch
//add for build scripts (more modular than the current default ?


module.exports = function(grunt) {
  // load all grunt tasks - this replaces explicitly declaring all grunt loadNPMTasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    //todo: extract this to an external module
    //todo: switch from bake to a better template grunt task
    var generateJSScriptTagsDebug = function (source, content) {
       return generateJSScriptTags(source, ["js/**/*.js", 'mvc/**/*.js'], process.cwd() + '/frontend/');
    };
    var generateJSScriptTags = function (source, srcPattern, srcDir) {
        var output = "";
        var snippet = "'/{{jsfile}}'";

        function addFiles(pattern, isNotLastPattern) {
            grunt.file.glob(pattern, { cwd: srcDir, sync: true }, function (er, files) {
                for (var x = 0; x < files.length; x++) {
                    output = output + snippet.replace("{{jsfile}}", files[x]);
                    var isNotLastFile = x < (files.length - 1);
                    if ( isNotLastFile || isNotLastPattern) {
                        output = output.concat(',');
                    }
                    output = output.concat('\r\n');
                }
            });
        }
        for (var y = 0 ; y < srcPattern.length; y++) {
            var isNotLastPattern = (y < (srcPattern.length -1));
            addFiles(srcPattern[y], isNotLastPattern);
        }
        return source.replace("{{javascriptFilesGoHere}}", output);
    };
  grunt.initConfig({

    jshint: {
        beforeconcat: ['Gruntfile.js','src/**/*.js', 'test/unit/**/*.js'],
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true
        }
    },

    connect: {
      options: {
          port: 8000,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      frontend: {
          options: {
              middleware: function (connect) {
                  return [
                      mountFolder(connect, 'app'),
                      showDirectory(connect, 'app')
                  ];
              }
          }
      }
    },

    verifylowercase : {
     all : {
        src: ["app/js/**"]
     }
    }


  });
    grunt.registerTask('default',
        [ 'verifylowercase',
          'jshint:beforeconcat'
        ]
    );

    //stop static http server
    grunt.registerTask('server', [
            'connect:frontend:keepalive'
        ]);
};
