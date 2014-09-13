module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'dist/beeplay.min.js': ['dist/beeplay.js']
        }
      }
    },
    browserify: {
      all: {
        files: {
          'dist/beeplay.js': 'src/beeplay.js',
        }
      }
    },
    copy: {
      dest: {
        expand: true,
        flatten: true,
        src: ['dist/beeplay.min.js'],
        dest: 'docs/js/',
      },
    },
    connect: {
      dest: {
        options: {
          hostname: '0.0.0.0',
          port: 5455,
          base: './docs/',
          livereload: true
        }
      }
    },
    open: {
      dest: {
        path: 'http://localhost:5455/'
      }
    },
    jshint: {
      options: {
        browser: true,
        sub: true,
        validthis: true
      },
      all: ['Gruntfile.js', 'src/*.js']
    },
    watch: {
      all: {
        options: {
          livereload: true,
          hostname: 'localhost',
          port: 5455
        },
        files: ['src/**/*.js'],
        tasks: ['build'],
      }
    },
    'gh-pages': {
      options: {
        base: 'docs',
      },
      src: ['**']
    }
  });

  grunt.registerTask('build', ['browserify', 'uglify', 'copy']);
  grunt.registerTask('server', ['connect', 'open', 'watch']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  // Main task
  grunt.registerTask('default', [
    'build', 'server', 'watch'
  ]);

  require('load-grunt-tasks')(grunt);
};
