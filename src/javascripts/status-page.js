// Wait for the document to be ready.
$(document).ready(function() {

	// Use moment.js to format all the datetimes.
	$('time.ago').each(function(index) {
		// Calculate the time ago in words from the dattime.
		var time_ago_in_words = moment($(this).attr('datetime')).fromNow();;
		
		// Update the test of the element to the time ago in words.
		$(this).text(time_ago_in_words);
	});

});