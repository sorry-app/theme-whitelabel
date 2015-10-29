/*
 *
 * This function determins if a given DOM element is curently visible
 * within the viewport, or whether it sits outside of it unseen.
 *
 * Nabbed from a SO article.
 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
 *
 */
function isElementInViewport (el) {
    if (typeof jQuery === "function" && el instanceof jQuery) { el = el[0]; }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}