/*
 * Small plugin which allows CSS truncation to be made expandable
 * by adding/remove the expended class.
 */
$(document).ready(function() {

	/* 
	 * Check all those truncate elements that are overflowing
	 * and apply an expandable class to them.
	 */
	var expandable = function() {
		/* Loop over the collection of truncation classes. */
		$('.truncate').each(function() {
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
	};

	/* Bind to the window resize event to re-run the expandable? method. */
	$(window).resize(function() { expandable(); });

	/* Run the setup once. */
	expandable();

});