'use strict';

module.exports = function(grunt) {

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  // Paths
  var path = {
    conf: 'config',
    src: 'src',
    dest: {
      assets: 'public/assets',
      templates: 'craft/templates'
    },
    root: 'public'
  };

  // Project configuration.
  grunt.initConfig({
    
    path: path,

    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      },
      requirejs: {
        files: '<%= path.src %>/js/**/*.js',
        tasks: ['requirejs']
      },
      sass: {
        files: '<%= path.src %>/sass/**/*.scss',
        tasks: ['sass'],
      },
      imagemin: {
        files: '<%= path.src %>/img/**/*.{gif,png,jpg,svg}',
        tasks: ['imagemin']
      },
      htmlmin: {
        files: '<%= path.src %>/templates/**/*.html',
        tasks: ['htmlmin']
      }
    },

    // Build

    requirejs: {
      compile: {
        options : {
          baseUrl: '',
          include: '<%= path.src %>/js/main',
          mainConfigFile: '<%= path.conf %>/require.js',
          name: '<%= path.src %>/js/lib/almond',
          out: '<%= path.dest.assets %>/js/scripts.js'
        }        
      }
    },

    sass: {
      dist: {
        options: {
          includePaths: require('node-neat').includePaths,
          style: 'compressed'
        },
        files: {
          '<%= path.dest.assets %>/css/styles.css': '<%= path.src %>/sass/manifest.scss'
        }
      }
    },

    imagemin: {
      gif: {
        files: [
          {
            dest: '<%= path.dest.assets %>/img/gif/',
            expand: true,
            ext: '.gif',
            flatten: true,
            src: ['<%= path.src %>/img/gif/*.gif']
          }
        ]
      },
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            dest: '<%= path.dest.assets %>/img/png/',
            expand: true,
            ext: '.png',
            flatten: true,
            src: ['<%= path.src %>/img/png/*.png']
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            dest: '<%= path.dest.assets %>/img/jpg/',
            expand: true,
            ext: '.jpg',
            flatten: true,
            src: ['<%= path.src %>/img/jpg/*.jpg'],
          }
        ]
      },
      svg: {
        options: {
          plugins: [
            {removeViewBox: false}
          ],
        },
        files: [
          {
            dest: '<%= path.dest.assets %>/img/svg/',
            expand: true,
            ext: '.svg',
            flatten: true,
            src: ['<%= path.src %>/img/svg/*.svg']
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {
            cwd: '<%= path.src %>/html',
            dest: '<%= path.dest.templates %>/',
            expand: true,
            flatten: true,
            src: '**/*.html'
          }
        ]
      }
    },
    
    // Tests

    jshint: {
      options: {
        force: true,
        jshintrc: '<%= path.conf %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= path.src %>/js/{,*/}*.js',
        '!<%= path.src %>/js/lib/*'
      ]
    },

    scsslint: {
      options: {
        bundleExec: false,
        config: '<%= path.conf %>/.scss-lint.yml',
        reporterOutput: null
      },
      files: [
        '<%= path.src %>/sass'
      ]
    },

    // Display

    php: {
      dist: {
        options: {
          base: '<%= path.dest %>',
          hostname: '127.0.0.1',
          port: '8010'
        }
      }
    },
    
    browserSync: {
      dist: {
        bsFiles: {
          src: [
            '<%= path.dest.assets %>/js/*.js',
            '<%= path.dest.assets %>/css/*.css',
            '<%= path.dest.root %>/*.php'
          ]
        },
        options: {
          ghostMode: {
            clicks: true,
            forms: true,
            links: true,
            scroll: true
          },
          logLevel: 'silent',
          notify: true,
          open: true,
          proxy: '127.0.0.1:8010',
          watchTask: true  
        }
      }
    }

  });

  grunt.registerTask('make', [
    'requirejs',
    'sass',
    'imagemin',
    'mustache_render'
  ]);
  
  grunt.registerTask('go', [
    'php:dist',
    'browserSync:dist',
    'watch'
  ]);

  grunt.registerTask('check:sass', ['scsslint']);
  
  grunt.registerTask('check:js', ['jshint']);

};
