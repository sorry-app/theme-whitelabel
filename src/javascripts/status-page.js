// Wait for the document to be ready.
$(document).ready(function() {

	// Configure Moment.js with the correct Locale.
	moment.locale($('body').data('locale'));

	// Use moment.js to format all the datetimes.
	$('time.ago').each(function(index) {
		// Calculate the time ago in words from the datetime.
		// Add format to help moment parse 2017-04-12 14:00:00 UTC cross browser as not ISO.
		var time_ago_in_words = moment($(this).attr('datetime')).fromNow();
		
		// Update the test of the element to the time ago in words.
		$(this).text(time_ago_in_words);
	});

	// Use moment.js to format all the duration timestamps.
	$('time.duration').each(function(index) {
		// Get the datetime attribute which contains an HTML valid
		// duration which we can pass to moment.
		//
		// Stripe the 's' from the end of the datetime attribute which is required
		// to make it a valid <time> tag based on the HTML spec.
		var duration_s = $(this).attr('datetime').replace(/\D/g,'');

		// Calculate a friendly duration.
		var distance_of_time_in_words = moment.duration({seconds: duration_s}).humanize();
		
		// Update the test of the element to the time ago in words.
		$(this).text(distance_of_time_in_words);
	});	

});