module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    project: {
        app: '<%= pkg.name %>',

        js: {
          files: 'src/processResponseData.js, src/configuration.js, src/easy-autocomplete.js',
          src: 'src/*.js',
          dest: 'dist/jquery.easy-autocomplete.js',
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
            ' * Copyright <%= pkg.license.type %> License: <%= pkg.license.url %>\n' +
            ' */\n'
    },
    

    //------------------------ JAVASCRIPT --------------------------

    concat: {
      "src-js": {
        src: ['src/configuration.js', 'src/logger.js', 'src/constans.js', 'src/listBuilder.js', 'src/proccessData.js', 'src/template.js', 'src/core.js'],
        dest: '<%= project.js.dest %>',
      }
    },

    comments: {
      js_dist: {
        options: {
            singleline: true,
            multiline: false
        },
        src: [ '<%= project.js.dest %>'] 
      },
    },

    uglify: {
        dist: {
          files: {
            '<%= project.js.dist %>' : '<%= project.js.dest %>'
          }
        }
    },


    jshint: {
      all: [
            '<%= project.js.src %>',
            //'test/*.js',
            //'test/core/*.js'
      ],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      options: {
        config: ".jscsrc"
      },
      all: [
        "<%= jshint.all %>"
      ]
    },

    qunit: {
      unit: [
        'test/*.html'
      ],
      integration: [
        'test/core/plugin.html',
        'test/core/build.html',
        'test/core/handles.html',
        'test/core/functions.html',
        'test/core/response.html',
        'test/core/categories.html',
        'test/core/event.html',
        'test/core/template.html',
        'test/core/features.html'
      ]
    },
    
    //------------------------ CSS --------------------------

    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourceMap: false
        },
        files: [{
         expand: true,
         cwd: '<%= project.sass.src %>',
         src: ['*.scss'],
         dest: '<%= project.sass.dist %>',
         ext: '.css'
        },
        {
         '<%= project.sass.dist %>/easy-autocomplete.themes.css': '<%= project.sass.src %>/easy-autocomplete.themes.scss'
        }]
      },
      dist: {
        options: {
          style: 'compressed',
          sourceMap: false
        },
        files: [{
         expand: true,
         cwd: '<%= project.sass.src %>',
         src: ['*.scss'],
         dest: '<%= project.sass.dist %>',
         ext: '.min.css'
        },
        {
         '<%= project.sass.dist %>/easy-autocomplete.themes.min.css': '<%= project.sass.src %>/easy-autocomplete.themes.scss'
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

    copy: {
      files: {
        cwd: '<%= project.sass.dist %>',  // set working folder / root to copy
        src: '*.map',           // copy all files and subfolders
        dest: '<%= project.sass.dist %>/maps',    // destination folder
        expand: true           // required when using cwd
      }
    },

    clean: ['<%= project.sass.dist %>/*.map'],


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
  
  grunt.registerTask('doc:jscs', ['jscs']);

  grunt.registerTask('doc:jshint', ['jshint']);

  grunt.registerTask('doc:csslint', ['csslint:lax']);

  grunt.registerTask('doc', ['jshint', 'jscs', 'csslint:lax']);

  grunt.registerTask('test', ['qunit:unit', 'qunit:integration']);

  grunt.registerTask('build', ['qunit:unit', 'concat', 'comments', 'uglify', 'sass:dev', 'sass:dist', 'usebanner', 'copy', 'clean']);
  
  grunt.registerTask('devel', ['build', 'qunit:integration']);

  grunt.registerTask('default', ['build', 'qunit:integration']);
};

