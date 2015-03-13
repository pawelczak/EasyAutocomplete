module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    project: {
        app: '<%= pkg.name %>',

        js: {
          src: 'src/easy-autocomplete.js',
          dist: 'dist/jquery.easy-autocomplete.min.js'
        },

        sass: {
          src: 'src/sass',
          dist: 'dist'
        }
    },
    
    tag: {
        banner: '/*\n' +
            ' * <%= pkg.name %>\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
            ' */\n'
    },
    

    //------------------------ JAVASCRIPT --------------------------

    uglify: {
        dist: {
          files: {
            '<%= project.js.dist %>' : ['<%= project.js.src %>']
          }
        }
    },


    jshint: {
      files: ['<%= project.js.src %>'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    
    //------------------------ CSS --------------------------

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: [{
         expand: true,
         cwd: '<%= project.sass.src %>',
         src: ['*.scss'],
         dest: '<%= project.sass.dist %>',
         ext: '.css'
        }]
      },
      dist: {
        options: {
          style: 'compressed',
          compass: false
        },
        files: [{
         expand: true,
         cwd: '<%= project.sass.src %>',
         src: ['*.scss'],
         dest: '<%= project.sass.dist %>',
         ext: '.min.css'
        }]
      },
    },
    
    
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['<%= project.sass.dist %>' + '/easy-autocomplete.min.css']
      },
      lax: {
        options: {
         import: false
        },
        src: ['<%= project.sass.dist %>' + '/easy-autocomplete.min.css']
      }
    },


    //------------------------ MISC --------------------------

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= tag.banner %>'
      },
      files: {
        src: [
          '<%= project.sass.dist %>/*',
          '<%= project.js.dist %>'
        ]
      }
    },


    watch: {
      build: {
        files: 'src/{,*/}*.{scss,js}',
        tasks: ['build']
      }
    }
  });
  
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('doc:jshint', ['jshint']);

  grunt.registerTask('doc:csslint', ['csslint:lax']);

  grunt.registerTask('doc', ['jshint', 'csslint:lax']);

  grunt.registerTask('build', ['uglify', 'sass:dev', 'sass:dist', 'usebanner']);
  
  grunt.registerTask('default', ['build']);
};

