'use strict'
const base = require("../base/index");

/**
 * 
 * @param {String|Buffer|Number} value 
 * @param {Boolean} Integer
 * @returns {String|Number}
 */
function hex_to_binary (value,Integer=false) {
    if (typeof(value) === "string") {
        value = Buffer.from(value,"hex");
    } else if ( typeof(value) === "number" && (!isNaN(value)) ) {
        //Distortion
        value = Buffer.from(value.toString(16),hex);
    } else if ((typeof(value) === "object") && (a instanceof Buffer)) {
        //Nothing to do, but write it will clearer 
        value = value;
    }
    
    let result = "";

    if (Integer === true) {
        result = "0";
        for (let i=value.length-1,mul=0; i>=0;i--,mul+=2) {
            let _mul = "16";
            for (let j=0;i<mul;j++) {
                _mul = base.calcu.multiply(_mul,"16");
            }
            result = base.calcu.addition(result,base.calcu.multiply(base.convert.sparseInt(value[i]),_mul));
        }
    } else {
        for (let i=0; i < value.length; i++) {
            let temp="";
            while(value[i] != 0) {
                temp = `${value[i]%2}`+temp;
                value[i] = base.convert.sparseInt(value[i]/2);
            }
            result = result + temp;
        }
    }
    return result;
}

const self = module.exports = { hex_to_binary };