"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const for_testing_1 = __importDefault(require("../utils/for_testing"));
const reverse = for_testing_1.default.reverseStr;
test('reverse of a', () => {
    const result = reverse('a');
    expect(result).toBe('a');
});
test('reverse of react', () => {
    const result = reverse('react');
    expect(result).toBe('tcaer');
});
test('reverse of reveler', () => {
    const result = reverse('releveler');
    expect(result).toBe('releveler');
});
