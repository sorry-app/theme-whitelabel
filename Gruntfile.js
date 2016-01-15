/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Load in the package information.
    pkg: grunt.file.readJSON("package.json"),

    // Load in your sorry credentials.
    // NOTE: NEVER CHECK YOUR CREDENTIALS INTO YOUR REPOSITORY.
    sorry: grunt.file.readJSON('sorry.json'),

    // Sorry theme deployment.
    sorry_theme_deploy: {
      options: {
        username: '<%= sorry.username %>',
        password: '<%= sorry.password %>'
      },     
      theme: {
        expand: true,
        cwd: 'build/',
        src: ['**/*']
      }
    },

    // Clean the build directory before we do anything.
    clean: ["build/"],

    // Javascript validation.
    jshint: {
      // Validate the gruntfile and theme src.
      all: ["Gruntfile.js", "src/assets/*.js"]
    },

    // JS Minification + Concatination.
    uglify: {
      my_target: {
        files: {
          'build/assets/status-page.min.js': [
            'src/javascripts/vendor/jquery-2.1.4.js',          
            //'src/javascripts/vendor/bootstrap/transition.js',
            //'src/javascripts/vendor/bootstrap/alert.js',
            //'src/javascripts/vendor/bootstrap/button.js',
            //'src/javascripts/vendor/bootstrap/carousel.js',
            //'src/javascripts/vendor/bootstrap/collapse.js',
            'src/javascripts/vendor/bootstrap/dropdown.js',
            //'src/javascripts/vendor/bootstrap/modal.js',
            //'src/javascripts/vendor/bootstrap/tooltip.js',
            //'src/javascripts/vendor/bootstrap/popover.js',
            //'src/javascripts/vendor/bootstrap/scrollspy.js',
            //'src/javascripts/vendor/bootstrap/tab.js',
            //'src/javascripts/vendor/bootstrap/affix.js',
            'src/javascripts/vendor/moment.js',
            'src/javascripts/vendor/is-element-in-viewport.js',
            'src/javascripts/smart-anchor.js',
            'src/javascripts/status-page.js'
          ]
        }
      }
    },

    // LESS CSS Compilation.
    // Compile the LESS source into the build directory.
    less: {
      production: {
        options: {
          cleancss: true,
        },
        files: {
          "build/assets/status-page.css": "src/stylesheets/main.less",
        }
      }
    },

    // Source files into the build directory.
    copy: {
      main: {
        files: [
          // Copy the liquid template from src to the build folder for push.
          { expand: true, flatten: true, src: "src/status-page.liquid", dest: "build/"},
          // Copy the error page template into the build folder.
          { expand: true, flatten: true, src: "src/error-page.liquid", dest: "build/"},
          // Copy the various layout files to the dist folder.
          { expand: true, flatten: true, cwd: "src/layouts/", src: "**", dest: "build/layouts"}, 
          // Copy javascript assets.
          { expand: true, flatten: true, cwd: "src/javascripts/", src: "**/*.min.js", dest: "build/assets/"},
          // Copy webfont assets.
          { expand: true, flatten: true, cwd: "src/fonts/", src: "**", dest: "build/assets/"},    
           // Copy image assets.
          { expand: true, flatten: true, cwd: "src/images/", src: "**", dest: "build/assets/"},
          // Copy Locale files.
          { expand: true, flatten: true, cwd: "src/locales/", src: "**", dest: "build/locales"},
        ]
      },
    },

    // Auto-deploy on file changes to theme src.
    watch: {
      theme: {
        files: 'src/**/*',
        tasks: ['deploy'],
        options: {
          interrupt: true,
        }
      }
    },

    // Release / Version of the theme as Github tags.
    release: {
      options: {
        npm: false // Don't publish the theme to NPM as not a node package.
      }
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sorry-theme-deploy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask("deploy", ["jshint", "clean", "uglify", "less", "copy", "sorry_theme_deploy"]);

};