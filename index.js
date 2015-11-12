module.exports = unwrap;

/**
 * Unwraps the given `source` DOM element by prepending all of its child nodes
 * into `target` before finally removing `source` from the DOM.
 *
 * @param {Element} source - DOM element to unwrap and then remove from the DOM
 * @param {Element} [target] - Optional DOM element where `sources` children
 *   should be inserted. Defaults to `source.parentNode`
 * @public
 */

function unwrap (source, target) {
  if (!target) target = source.parentNode;
  var start, end, el;

  // if the first child is a TextNode with the 0-width space inside of it,
  // then we can safely remove it from the `source`, so that we don't end
  // up transferring it to the `target` element
  el = source.firstChild;
  if (el && el.nodeType === Node.TEXT_NODE && el.nodeValue === '\u200B') {
    source.removeChild(el);
    el = null;
  }

  // transfer child nodes to *before* the `source` element in the `target` DOM
  // element
  while (source.childNodes.length > 0) {
    el = source.childNodes[0];
    if (!start) start = el;
    end = el;
    target.insertBefore(el, source);
  }

  // remove `source` from the DOM
  source.parentNode.removeChild(source);
}
