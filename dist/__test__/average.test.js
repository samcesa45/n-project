"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const for_testing_1 = __importDefault(require("../utils/for_testing"));
const average = for_testing_1.default.averageNum;
describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1);
    });
    test('of many is calculated right', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });
    test('of empty array is zero', () => {
        expect(average([])).toBe(0);
    });
});
