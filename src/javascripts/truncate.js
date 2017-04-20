/*
 * Small plugin which allows CSS truncation to be made expandable
 * by adding/remove the expended class.
 */
$(document).ready(function() {

	/* Bind to any expandable truncate elements, so we can toggle the expanded state. */
	$(document).on('click', '[data-toggle="truncate"]', function(e) {
		/* Element was clicked, toggle the truncated/expended state. */
		$(this).parent().toggleClass('truncated', 'expanded');
	});

	/* Run the truncate evaluation regularly to pickup changes in DOM structure. */
	/* This is so we pickup when truncated text contains are hidden/expanded. */
	setInterval(function() {
		/* 
		 * Check all those truncate elements that are overflowing
		 * and apply an expandable class to them.
		 */

		/* Loop over the collection of truncation classes. */
		$('.truncate.truncated').each(function() {
			/*
			 * Check the width vs the scrollWidth to determine if these
			 * elements are overflowing their content or not.
			 */
			if (this.offsetWidth < this.scrollWidth) {
				/* This element is overflowing, add an expandable class to it. */
				$(this).addClass('expandable');
			} else {
				/* This element is not overflowing it's content, remove the class. */
				$(this).removeClass('expandable');
			}
		});
	/* Run ever 100 milliseconds. */
	}, 100);

});