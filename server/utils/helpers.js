/**
 * 
 * @param {String} str string to be formatted/sanitized
 * @returns string without leading and trailing whitespaces and in lowercase
 */
exports.sanitize = (str) => {
    let newString = str.trim().toLowerCase();
    return newString
}