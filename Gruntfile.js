module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'dest',
      },
      src: ['**']
    },
    copy: {
      dest: {
        expand: true,
        flatten: true,
        src: ['src/*.js'],
        dest: 'dest/js',
      },
    },
    connect: {
      dest: {
        options: {
          hostname: '0.0.0.0',
          port: 5455,
          base: './',
          livereload: true
        }
      }
    },
    open: {
      dest: {
        path: 'http://localhost:5455/dest'
      }
    },
    jshint: {
      options: {
        browser: true,
        sub: true,
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
        files: ['src/*.js'],
        tasks: ['build'],
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'copy']);
  grunt.registerTask('server', ['connect', 'open']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  // Main task
  grunt.registerTask('default', [
    'build', 'server', 'watch'
  ]);

  require('load-grunt-tasks')(grunt);
};
