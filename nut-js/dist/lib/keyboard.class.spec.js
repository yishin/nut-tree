"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_enum_1 = require("./key.enum");
const keyboard_class_1 = require("./keyboard.class");
const sneer_1 = require("sneer");
const noop_log_provider_class_1 = require("./provider/log/noop-log-provider.class");
jest.setTimeout(10000);
beforeEach(() => {
    jest.clearAllMocks();
});
const providerRegistryMock = (0, sneer_1.mockPartial)({
    getLogProvider() {
        return new noop_log_provider_class_1.NoopLogProvider();
    },
    getKeyboard() {
        return (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
        });
    },
});
describe("Keyboard", () => {
    it("should have a default delay of 300 ms", () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        // WHEN
        // THEN
        expect(SUT.config.autoDelayMs).toEqual(300);
    });
    it("should pass input strings down to the type call.", async () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        const payload = "Test input!";
        const typeMock = jest.fn();
        providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
            type: typeMock,
        }));
        // WHEN
        await SUT.type(payload);
        // THEN
        expect(typeMock).toHaveBeenCalledTimes(payload.length);
        for (const char of payload.split("")) {
            expect(typeMock).toHaveBeenCalledWith(char);
        }
    });
    it("should pass multiple input strings down to the type call.", async () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        const payload = ["Test input!", "Array test2"];
        const typeMock = jest.fn();
        providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
            type: typeMock,
        }));
        // WHEN
        await SUT.type(...payload);
        // THEN
        expect(typeMock).toHaveBeenCalledTimes(payload.join(" ").length);
        for (const char of payload.join(" ").split("")) {
            expect(typeMock).toHaveBeenCalledWith(char);
        }
    });
    it("should pass input keys down to the click call.", async () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        const clickMock = jest.fn();
        providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
            click: clickMock,
        }));
        // WHEN
        await SUT.type(...payload);
        // THEN
        expect(clickMock).toHaveBeenCalledTimes(1);
        expect(clickMock).toHaveBeenCalledWith(...payload);
    });
    it("should pass a list of input keys down to the click call.", async () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        const clickMock = jest.fn();
        providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
            click: clickMock,
        }));
        // WHEN
        for (const key of payload) {
            await SUT.type(key);
        }
        // THEN
        expect(clickMock).toHaveBeenCalledTimes(payload.length);
    });
    it("should pass a list of input keys down to the pressKey call.", async () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        const keyMock = jest.fn();
        providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
            pressKey: keyMock,
        }));
        // WHEN
        for (const key of payload) {
            await SUT.pressKey(key);
        }
        // THEN
        expect(keyMock).toHaveBeenCalledTimes(payload.length);
    });
    it("should pass a list of input keys down to the releaseKey call.", async () => {
        // GIVEN
        const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        const keyMock = jest.fn();
        providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
            setKeyboardDelay: jest.fn(),
            releaseKey: keyMock,
        }));
        // WHEN
        for (const key of payload) {
            await SUT.releaseKey(key);
        }
        // THEN
        expect(keyMock).toHaveBeenCalledTimes(payload.length);
    });
    describe("autoDelayMs", () => {
        it("pressKey should respect configured delay", async () => {
            // GIVEN
            const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
            const delay = 100;
            SUT.config.autoDelayMs = delay;
            const keyMock = jest.fn();
            providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
                setKeyboardDelay: jest.fn(),
                pressKey: keyMock,
            }));
            // WHEN
            const start = Date.now();
            await SUT.pressKey(key_enum_1.Key.A);
            const duration = Date.now() - start;
            // THEN
            expect(duration).toBeGreaterThanOrEqual(delay);
        });
        it("should pass a list of input keys down to the releaseKey call.", async () => {
            // GIVEN
            const SUT = new keyboard_class_1.KeyboardClass(providerRegistryMock);
            const delay = 100;
            SUT.config.autoDelayMs = delay;
            const keyMock = jest.fn();
            providerRegistryMock.getKeyboard = jest.fn(() => (0, sneer_1.mockPartial)({
                setKeyboardDelay: jest.fn(),
                releaseKey: keyMock,
            }));
            // WHEN
            const start = Date.now();
            await SUT.releaseKey(key_enum_1.Key.A);
            const duration = Date.now() - start;
            // THEN
            expect(duration).toBeGreaterThanOrEqual(delay);
        });
    });
});
//# sourceMappingURL=keyboard.class.spec.js.map