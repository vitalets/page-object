/**
 * Page object building library.
 */

/**
 * Creates PO instance as tagged template function.
 *
 * @param {object} parent
 * @param {string} taggedSelector
 * @returns {function}
 */
const createPO = (parent, taggedSelector) => {
  // When called with arguments: parse template literal and create new PO nested from current
  // When called without arguments: return string value
  const fn = (...args) => args.length ? createPO(fn, buildStringFromLiteral(...args)) : fn.toString();
  fn.toString = fn.toJSON = () => `${parent}${taggedSelector}`;
  // Function.name is not writable by default
  Object.defineProperty(fn, 'name', {value: `"${fn}"`});
  return fn;
};

/**
 * Gets string from template literal data.
 *
 * @param {array} strings
 * @param {array} keys
 * @returns {string}
 */
const buildStringFromLiteral = (strings, ...keys) => {
  return strings.reduce((acc, str, i) => `${acc}${str}${i < keys.length ? keys[i] : ''}`, '');
};

module.exports = createPO('', '');
