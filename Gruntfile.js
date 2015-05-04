module.exports = function (grunt) {
  'use strict';

  // load all grunt plugins found in the package.json
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // package configuration
    pkg: grunt.file.readJSON('package.json'),

    // Sass compiling
    sass: {
      options: {
        precision: 6,
        sourceComments: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'css/main.css': '_scss/main.scss'
        }
      }
    },

    // vendor prefix handling
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      dist: {
        src: 'css/*.css'
      },
      docs: {
        src: '_site/*.css'
      }
    },

    // build tools

    watch: {
      sass: {
        files: ['scss/**/*.scss', 'docs/docs.scss'],
        tasks: ['sass', 'autoprefixer']
      }
    },

    jekyll: {
      options: {
        src: 'docs',
        dest: '_site',
        config: '_config.yml'
      }
    },

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:resir014/NineSevenThree.git',
          branch: 'gh-pages'
        }
      }
    }

  });

  // builds the page contents
  grunt.registerTask('default', ['sass', 'jekyll', 'autoprefixer:dist']);

  // publishes to GitHub Pages
  grunt.registerTask('publish', ['jekyll', 'autoprefixer:docs', 'buildcontrol:pages']);
}
