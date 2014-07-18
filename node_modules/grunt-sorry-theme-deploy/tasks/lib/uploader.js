// Filesystem and Restler http library.
var fs = require('fs');
var rest = require('restler');

// Initialize the uploader class.
exports.init = function (grunt, options) {

    // Method to get the API endpoint.
    var api_endpoint = options.host + '/1/pages/' + options.page + '/theme';

	// Upload the theme to the API.
	exports.upload = function (archive_path, callback) {
	  // Log that we're starting the deployment process.
	  grunt.log.ok('Deploying theme to "' + options.page + '"');

      // HTTP request to upload the file to the api.
      rest.request(api_endpoint, {
        // Stadard multipart HTTP POST to the api.
        method: 'PUT',
        multipart: true,
        parser: rest.parsers.json,
        username: options.username,
        password: options.password,

        // Data for the request.
        data: {
          // Attach the zipfile we've just created.
          zip: rest.file(archive_path, null, fs.statSync(archive_path).size, null, 'application/zip')
        }

		// Callback once the upload is complete.
		}).on('success', function(data, response) {
			// Upload was succesfull.
			// Log that things were a success.
			grunt.log.ok('Theme successfully deployed to "' + options.page + '"');

		}).on('fail', function(data, response) {
			// Append all of the validation messages to grunt errors.
			// Loop over the error messages collection.
			grunt.util._.each(data.messages, function(value, key) {
				// Loop over the messages for each key.
				grunt.util._.each(value, function(message) {
					// Log the error message with grunt.
					grunt.log.warn(message);
				});
			});

			// The upload was not a success.
			// Fail gracefully with some error information.
			grunt.fail.fatal( data.error_description ? data.error_description : data.error );

		}).on('error', function(err, request) {
			// The upload was not a success.
			// Fail gracefully with some error information.
			grunt.fail.fatal(err);

		}).on('timeout', function(ms) {
			// The upload timed out.
			grunt.fail.fatal('The deployment took too long and so has been stopped.');

		}).on('complete', function(data, response) {
			// The upload attempt for better or works is now complete.
	        // Run the callback method.
	        callback();
		});
    };

	// Return the classes exports.
	return exports;

};