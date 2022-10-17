"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reverseStr = (str) => {
    return str
        .split('')
        .reverse()
        .join('');
};
const averageNum = (arr) => {
    const reducer = (sum, item) => {
        return sum + item;
    };
    return arr.length === 0 ? 0 : arr.reduce(reducer, 0) / arr.length;
};
exports.default = {
    reverseStr,
    averageNum
};
