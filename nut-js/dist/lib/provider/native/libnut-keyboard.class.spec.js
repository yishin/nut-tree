"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const key_enum_1 = require("../../key.enum");
const libnut_keyboard_class_1 = __importDefault(require("./libnut-keyboard.class"));
jest.mock("@nut-tree/libnut");
beforeEach(() => {
    jest.resetAllMocks();
});
describe("libnut keyboard action", () => {
    describe("click", () => {
        it("should forward the keyTap call to libnut for a known key", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.click(key_enum_1.Key.A);
            // THEN
            expect(libnut.keyTap).toBeCalledTimes(1);
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            libnut.keyTap = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            await expect(SUT.click(key_enum_1.Key.A)).rejects.toThrowError("Test error");
        });
        it("should not forward the keyTap call to libnut for an unknown key", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.click(key_enum_1.Key.Pause);
            // THEN
            expect(libnut.keyTap).not.toBeCalled();
        });
    });
    describe("type", () => {
        it("should forward the type call to libnut", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            const payload = "testInput";
            // WHEN
            await SUT.type(payload);
            // THEN
            expect(libnut.typeString).toBeCalledTimes(1);
            expect(libnut.typeString).toBeCalledWith(payload);
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            libnut.typeString = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            await expect(SUT.type("foo")).rejects.toThrowError("Test error");
        });
    });
    describe("pressKey", () => {
        it("should forward the pressKey call to libnut for a known key", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.pressKey(key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith(libnut_keyboard_class_1.default.keyLookup(key_enum_1.Key.A), "down", []);
        });
        it("should treat a list of keys as modifiers + the actual key to press", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.pressKey(key_enum_1.Key.LeftControl, key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith(libnut_keyboard_class_1.default.keyLookup(key_enum_1.Key.A), "down", [libnut_keyboard_class_1.default.keyLookup(key_enum_1.Key.LeftControl)]);
        });
        it("should not forward the pressKey call to libnut for an unknown key", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.pressKey(key_enum_1.Key.Pause);
            // THEN
            expect(libnut.keyToggle).not.toBeCalled();
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            libnut.keyToggle = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            await expect(SUT.pressKey(key_enum_1.Key.A)).rejects.toThrowError("Test error");
        });
    });
    describe("releaseKey", () => {
        it("should forward the releaseKey call to libnut for a known key", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.releaseKey(key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith(libnut_keyboard_class_1.default.keyLookup(key_enum_1.Key.A), "up", []);
        });
        it("should treat a list of keys as modifiers + the actual key to release", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.releaseKey(key_enum_1.Key.LeftControl, key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith(libnut_keyboard_class_1.default.keyLookup(key_enum_1.Key.A), "up", [libnut_keyboard_class_1.default.keyLookup(key_enum_1.Key.LeftControl)]);
        });
        it("should not forward the releaseKey call to libnut for an unknown key", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.releaseKey(key_enum_1.Key.Pause);
            // THEN
            expect(libnut.keyToggle).not.toBeCalled();
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            libnut.keyToggle = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            await expect(SUT.releaseKey(key_enum_1.Key.A)).rejects.toThrowError("Test error");
        });
    });
    describe("bugfix #260", () => {
        it("should forward the pressKey call to libnut for 'delete'", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.pressKey(key_enum_1.Key.Delete);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith("delete", "down", []);
        });
        it("should forward the releaseKey call to libnut for 'delete'", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_class_1.default();
            // WHEN
            await SUT.releaseKey(key_enum_1.Key.Delete);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith("delete", "up", []);
        });
    });
});
//# sourceMappingURL=libnut-keyboard.class.spec.js.map