"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_class_1 = require("./assert.class");
const region_class_1 = require("./region.class");
const screen_class_1 = require("./screen.class");
const provider_registry_class_1 = __importDefault(require("./provider/provider-registry.class"));
const sneer_1 = require("sneer");
jest.mock("jimp", () => { });
jest.mock("./screen.class");
const needleId = "needleId";
describe("Assert", () => {
    it("isVisible should not throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.ScreenClass.prototype.find = jest.fn(() => Promise.resolve(new region_class_1.Region(0, 0, 100, 100)));
        const screenMock = new screen_class_1.ScreenClass(provider_registry_class_1.default);
        const SUT = new assert_class_1.AssertClass(screenMock);
        const needle = (0, sneer_1.mockPartial)({
            id: needleId,
        });
        // WHEN
        // THEN
        await expect(SUT.isVisible(needle)).resolves.not.toThrowError();
    });
    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new screen_class_1.ScreenClass(provider_registry_class_1.default);
        const SUT = new assert_class_1.AssertClass(screenMock);
        const needle = (0, sneer_1.mockPartial)({
            id: needleId,
        });
        // WHEN
        // THEN
        await expect(SUT.isVisible(needle)).rejects.toThrowError(`Element '${needle.id}' not found`);
    });
    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new screen_class_1.ScreenClass(provider_registry_class_1.default);
        const SUT = new assert_class_1.AssertClass(screenMock);
        const searchRegion = new region_class_1.Region(10, 10, 10, 10);
        const needle = (0, sneer_1.mockPartial)({
            id: needleId,
        });
        // WHEN
        // THEN
        await expect(SUT.isVisible(needle, searchRegion)).rejects.toThrowError(`Element '${needle.id}' not found in region ${searchRegion.toString()}`);
    });
    it("isNotVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.ScreenClass.prototype.find = jest.fn(() => Promise.resolve(new region_class_1.Region(0, 0, 100, 100)));
        const screenMock = new screen_class_1.ScreenClass(provider_registry_class_1.default);
        const SUT = new assert_class_1.AssertClass(screenMock);
        const needle = (0, sneer_1.mockPartial)({
            id: needleId,
        });
        // WHEN
        // THEN
        await expect(SUT.notVisible(needle)).rejects.toThrowError(`'${needle.id}' is visible`);
    });
    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.ScreenClass.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new screen_class_1.ScreenClass(provider_registry_class_1.default);
        const SUT = new assert_class_1.AssertClass(screenMock);
        const needle = (0, sneer_1.mockPartial)({
            id: needleId,
        });
        // WHEN
        // THEN
        await expect(SUT.notVisible(needle)).resolves.not.toThrowError();
    });
});
//# sourceMappingURL=assert.class.spec.js.map