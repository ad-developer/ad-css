/**
 * ad-css Gruntfile
 * Copyright 2017 A.D.
 */
module.exports = function(grunt) {
   "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    // -- exec Config ----------------------------------------------------------
    exec: {
      sass: {
        command: 'npm run sass'
      }
    },

    // -- Clean Config ---------------------------------------------------------
    clean: {
        build: ['dist/css/*.css'],
        sass: ['sass/*.css'],
        site: ['site/css/ad.css']
    },

    // -- Copy Config ----------------------------------------------------------
    copy:{
      build: {
          src    : 'scss/*.css',
          dest   : 'dist/css',
          expand : true,
          flatten: true
      },
      site: {
        src    : 'dist/css/ad.css',
        dest   : 'site/css',
        expand : true,
        flatten: true
      }
    },

    // -- Watch Config ---------------------------------------------------------
    watch: {
      options: {
        livereload: true
      },
      sass:{
        files:['scss/**/*.scss'],
        tasks:['build']
      },
      copy:{
        files:['scss/**/*.scss'],
        tasks:['copy:build', 'clean:sass', 'postcss'],
        options: {
            spawn: false
        }
      }
    },

    // -- PostCSS Config -------------------------------------------------------
    postcss: {
        options: {
            processors: [
                require('autoprefixer')({browsers: ['last 2 versions', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 6', 'Android >= 4']})
            ]
        },
        dist: {
            src: 'dist/css/*.css'
        }
    },

    // -- CSSLint Config -------------------------------------------------------

    csslint: {
        options: {
            csslintrc: '.csslintrc'
        },
        build   : ['dist/css/*.css']
    }
  });


  // npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', [
      'clean:build',
      'clean:sass',
      'exec:sass',
      'copy:build',
      'postcss',
      'clean:sass',
      'test',
      'clean:site',
      'copy:site'
  ]);

  grunt.registerTask('test', ['csslint']);

  // Default task(s).
  //grunt.registerTask('default', ['build', 'watch:sass']);
  grunt.registerTask('default', ['build']);

};
