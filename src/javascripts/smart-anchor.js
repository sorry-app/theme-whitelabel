/*
 *
 * This is a small plugin which allows you to create acnhor links which
 * only link when the target isn't already visible within the viewport.
 *
 * We use this within the theme for the support link under the all systems are
 * go, as on some screen sizes the support links are already visible, but they
 * aren't on others of if large amounts of content are on the page.
 *
 * Depenacies: is-element-in-viewport.js
 *
 * Usage: <a data-smart-anchor="#target"> instead of <a href="#target">
 *
 */
// Invoke on load, scroll and window change.
$(window).on('DOMContentLoaded load resize scroll', function(e) {

	// Get all the smart anchor elents on the page.
	$("a[data-smart-anchor]").each(function() {
		// Get the target of the data attribute.
		var $target = $($(this).data('smart-anchor'));

		// Toggle the href attribute on the link based on the visibility
		// of the targer element so if it's visible we don't link to it.
		if (isElementInViewport($target)) {
			// The element is currently visible, make sure the href attribute
			// is removed from the link.
			$(this).removeAttr('href');
		} else {
			// This element is NOT currently visible, so we want to provide
			// an anchor link to it.
			$(this).attr('href', '#' + $target.attr('id'));
		}
	});

}); 