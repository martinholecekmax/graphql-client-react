/**
 * Convert a camel case string to human readable
 * @param {string} str
 * @returns {string} Human readable string
 * @example
 * camelCaseToHumanReadable('camelCaseString') // Camel Case String
 */
export const camelCaseToHumanReadable = function (str) {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function (x) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
    })
    .join(' ');
};
