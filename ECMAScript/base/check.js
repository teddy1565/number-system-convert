'use strict'

/**
 * 
 * @param {String} value 
 * @returns {Boolean}
 */
function checkStringZeroHead(value) {
    if (value[0] == '0') {
        return true;
    }
    return false;
}

const self = module.exports = { checkStringZeroHead };