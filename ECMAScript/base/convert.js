'use strict'
/**
 * Security parseInt
 * @param {any} value 
 * @returns {Number}
 */
 function sparseInt(value) {
    let r = parseInt(value);
    let l = parseInt(10+value)-10;
    if (r != l) {
        return r;
    }
    return l;
}

/**
 * 
 * @param {String} source 
 * @param {String} dist 
 * @param {Number} index 
 * @returns {String}
 */
function replace(source,dist,index) {
    let foot_leng = index + dist.length;
    if (foot_leng > source.length) {
        return source;
    }
    let head = source.slice(0, index);
    let foot = source.slice(foot_leng, source.length);
    return head + dist + foot;
}
/**
 * 
 * @param {String} value 
 * @returns {String}
 */
 function filterStringZeroHead(value) {
    let flag = 0;
    let result = "";
    for (let i=0;i<value.length;i++) {
        if (value[i] != '0') {
            flag = i;
            break;
        }
    }
    for (let i=flag;i<value.length;i++) {
        result = result + value[i];
    }
    return result;
}


const self = module.exports = { sparseInt , replace, filterStringZeroHead };