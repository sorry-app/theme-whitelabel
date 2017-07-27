/*
 * Small plugin which allows CSS truncation to be made expandable
 * by adding/remove the expended class.
 */
$(document).ready(function() {

	/* Bind to any expandable truncate elements, so we can toggle the expanded state. */
	$(document).on('click', '[data-toggle="truncate"]', function(e) {
		/* Prevent the default click link behaviour. */
		e.preventDefault();
		
		/* Element was clicked, toggle the truncated/expended state. */
		$($(this).attr('href')).toggleClass('truncated');
	});

	/* Run the truncate evaluation regularly to pick-up changes in DOM structure. */
	/* This is so we pick-up when truncated text contains are hidden/expanded. */
	setInterval(function() {
		/* 
		 * Check all those truncate elements that are overflowing
		 * and apply an expandable class to them.
		 */
		/* Loop over the collection of truncation classes. */
		$('.truncate.truncated').each(function() {
			/* 
			 * Select the targeting toggle switches so that
			 * so that we can update their class/state for truncated strings.
			 */
			var toggles = $('[data-toggle="truncate"][href="#' + this.id + '"]');

			/*
			 * Check the width vs. the scrollWidth to determine if these
			 * elements are overflowing their content or not.
			 */
			if (this.offsetWidth < this.scrollWidth) {
				/* They are overflowing and truncated, so update the toggles state. */
				toggles.addClass('truncated');
			} else {
				/* They are NOT overflowing or truncated, so update the toggles state. */
				toggles.removeClass('truncated');
			}
		});
	/* Run ever 100 milliseconds. */
	}, 100);

});