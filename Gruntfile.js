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
          // Copy the liquid template from src to the dist folder for push.
          { expand: true, flatten: true, src: "src/status-page.liquid", dest: "build/"},
          // Copy images over to the build and distribution folders.
          { expand: true, flatten: true, cwd: "src/images/", src: "**", dest: "build/assets/"},
          // Copy javascript assets.
          { expand: true, flatten: true, cwd: "src/javascripts/", src: "**", dest: "build/assets/"},  
          // Copy webfont assets.
          { expand: true, flatten: true, cwd: "src/fonts/", src: "**", dest: "build/assets/"},                    
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

  // Default task(s).
  grunt.registerTask("deploy", ["jshint", "clean", "less", "copy", "sorry_theme_deploy"]);

};