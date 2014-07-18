// Archiver and compression utilities.
var fs = require('fs');
var archiver = require('archiver');
var path = require('path');

// Initialize the uploader class.
exports.init = function (grunt, options) {

	// Upload the theme to the API.
	exports.bundle = function(files, callback) {
		// Create an achiver instance to work with.
	    var archive = archiver.create('zip');
	    // Get a reference to the destination file.
	    var dest = options.destination;

	    // Ensure dest folder exists
	    grunt.file.mkdir(path.dirname(dest));

	    // Where to write the file
	    var destStream = fs.createWriteStream(dest);

		// Log that we're begining the bundling process.
		grunt.log.ok('Bundling theme ready for deployment.');

	    // Archive error handler.
	    archive.on('error', function(err) {
			// Log the error through grunt.
			grunt.log.error(err);
			// Fail the task.
			grunt.fail.warn('Archiving failed.');
	    });

	    // Callback for when file added to the zip/
	    archive.on('entry', function(file) {
	    	// Log that we added the file to the achive.
	      	grunt.verbose.writeln('Added ' + file._srcFile + ' to theme bundle.');
	    });

	    // Callback for when writing the file errors.
	    destStream.on('error', function(err) {
			// Log the error.
			grunt.log.error(err);
			// Fail the task.
			grunt.fail.warn('WriteStream failed.');
	    });

	    // Callback when the zip archive file is closed.
	    destStream.on('close', function() {
	    	// Log that the zip file is created.
	      	grunt.log.ok('Theme bundling complete: ' + String(dest));
	      	
	      	// Run the callback.
	      	callback(dest);
	    });

	    // Set the archiver output stream to the destination file.
	    archive.pipe(destStream);

	    // Loop over the collection of files passed in to be archived.
	    files.forEach(function(file) {
	    	// Check if the file is an expended pair.
			var isExpandedPair = file.orig.expand || false;

			// Look at the collection of files src path.
			var src = file.src.filter(function(f) {
				// Check that this is a file on the FS.
				return grunt.file.isFile(f);
			});

			// Loop over the sources for this file entry.
			src.forEach(function(srcFile) {
				// Calculate the files name.
				var internalFileName = (isExpandedPair) ? file.dest : exports.unixifyPath(path.join(file.dest || '', srcFile));
				
				// Set the files data including it's name and path.
				var fileData = {
					name: internalFileName,
					_srcFile: srcFile
				};

				// Queue the file to be added to the archive.
				archive.file(srcFile, fileData);
			});
	    });

	    // Finallize the archive.
	    // This kicks off the write process for the queued files.
	    archive.finalize();
	};

	// Format paths so they work consistantly accross platforms.
	exports.unixifyPath = function(filepath) {
		// Check if this is a windows platform or unix.
		if (process.platform === 'win32') {
			// This is a windows platform, convert the slashes in the path.
			return filepath.replace(/\\/g, '/');
		} else {
			// This is a unix platform, use the default path.
			return filepath;
		}
	};	

	// Return the classes exports.
	return exports;

};