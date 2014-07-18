/*
 * grunt-sorry-theme-deploy
 * https://github.com/supporttime/grunt-sorry-theme-deploy
 *
 * Copyright (c) 2014 Robert Rawlins
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // Resolver for relative paths.
  var path = require("path");

  // Register the task.
  grunt.registerMultiTask('sorry_theme_deploy', 'A grunt task to automate the deployment of your status page themes to your Sorry account.', function() {

    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Configure the bundler library.
    var bundler = require('./lib/bundler').init(grunt, this.options({
      // Default path for the theme is in the src directory.
      destination: path.resolve('dist/theme.zip')
    }));

    // Configure the uploader library.
    var uploader = require('./lib/uploader').init(grunt, this.options({
      // Default login credentials pulled from environment variables.
      username: process.env.SORRY_USERNAME,
      password: process.env.SORRY_PASSWORD,
      host: grunt.option('sorry-host') || 'https://api.sorryapp.com',
      page: grunt.option('sorry-page')
    }));

    // Run the bundle and upload process.
    // Start by asking the bundler to bundle the theme.
    bundler.bundle(this.files, function(archive_path) {
      // The bundler has completed bundling the theme.
      // Have the uploader upload the file.
      uploader.upload(archive_path, function() {
        // The upload taskis complete.
        done();
      });
    });

  });

};
