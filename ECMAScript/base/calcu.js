'use strict'

const convert = require("./convert");
const check = require("./check");


/**
 * Only positive integer
 * @param {String} a 
 * @param {String} b 
 * @returns {String}
 */
function addition(a, b) {
    if (a.length < 8 & b.length < 8) {
        return `${convert.sparseInt(a) + convert.sparseInt(b)}`;
    }
    let result = "";
    let tmp = 0;
    if (a.length !== b.length) {
        if (a.length > b) {
            b = b.padStart(a.length,"0");
        } else {
            a = a.padStart(b.length,"0");
        }
    }

    for (let i=a.length-1; i>=0; i--) {
        let r = parseInt(a[i]||0) + parseInt(b[i]||0);
        if (tmp != 0) {
            r = r + tmp;
            tmp = 0;
        }

        if (r >= 10) {
            tmp = convert.sparseInt(r/10);
            r = r%10;
        }
        result = result + `${r}`;
    }

    result = convert.filterStringZeroHead(result);
    tmp = convert.filterStringZeroHead(`${tmp==0?"":tmp}`);

    return tmp+result;
}

/**
 * 
 * @param {String} value 
 * @param {Number} index 
 * @returns {String}
 */
function sub_refresh(value, index) {
    if (index < 0) {
        return value.padStart(value.length+1,"-");
    }
    let r = parseInt(value[index]) - 1;
    if (r < 0) {
        value = convert.replace(value, `${parseInt(value[index])+9}`, index);
        return sub_refresh(value, index-1);
    }
    value = convert.replace(value, `${r}`, index);
    return value;
}

/**
 * 
 * @param {String} a 
 * @param {String} b 
 * @returns {String}
 */
function subtraction(a, b) {
    if (a === b) {
        return "0";
    }
    let backup_a = a;
    let backup_b = b;
    let r = "";
    if (a.length > b.length) {
        b = b.padStart(a.length,"0");
    } else {
        a = a.padStart(b.length,"0");
    }
    if (a.length < 8) {
        return `${convert.sparseInt(a) - convert.sparseInt(b)}`;
    }
    for (let i=a.length-1;i>=0;i--) {
        if (a[0] == "-") {
            return `-` + `${subtraction(backup_b, backup_a)}`;
        }
        let tmp = parseInt(a[i]) - parseInt(b[i]);
        if (tmp < 0) {
            tmp = (10+parseInt(a[i])) - parseInt(b[i]);
            a = sub_refresh(a,i-1);
        }
        r = `${tmp}`+r;
    }
    return r;
}

/**
 * 
 * @param {String} a 
 * @param {String} b
 * @returns {String}
 */
function multiply(a, b) {
    if (convert.sparseInt(addition(a,"0")) === 0 || convert.sparseInt(addition(b,"0")) === 0) {
        return "0";
    }
    if (a.length < 5 && b.length < 5) {
        return `${convert.sparseInt(a) * convert.sparseInt(b)}`;
    }
    let result = "0";
    for (let i="0"; compareBigger(i,b) == false; i=addition(i,"1")) {
        result = addition(result,a);
    }
    return result;
}

/**
 * 
 * @param {String} a 
 * @param {String} b 
 * @returns {Boolean}
 */
function compareBigger(a, b) {
    let result = subtraction(a,b);
    if (result[0] == "-") {
        return false;
    }
    return true;
}

const self = module.exports = { addition, subtraction, multiply, compareBigger };