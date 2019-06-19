"use strict";
/**
 * modified `camelCase` from lodash
 * https://github.com/lodash/lodash/blob/3ae8f23bff9c5de1d903409630b0eedb8cb6b59a/camelCase.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
var asciiWords = RegExp.prototype.exec.bind(/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g);
function words(s) {
    return asciiWords(s) || [];
}
function upperFirst(s) {
    if (s === '') {
        return '';
    }
    return s[0].toUpperCase() + s.slice(1);
}
function camelCase(s) {
    return words(("" + s).replace(/['\u2019]/g, '')).reduce(function (result, word, index) {
        var w = word.toLowerCase();
        return result + (index ? upperFirst(w) : w);
    }, '');
}
exports.camelCase = camelCase;
