module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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

  grunt.registerTask('build', ['jshint']);
  grunt.registerTask('server', ['connect', 'open']);

  // Main task
  grunt.registerTask('default', [
    'build', 'server', 'watch'
  ]);
};
