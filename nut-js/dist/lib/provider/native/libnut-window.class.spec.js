"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const libnut_window_class_1 = __importDefault(require("./libnut-window.class"));
const region_class_1 = require("../../region.class");
jest.mock("@nut-tree/libnut");
beforeEach(() => {
    jest.resetAllMocks();
});
describe("libnut WindowAction", () => {
    describe("getWindows", () => {
        it("should resolve to a list of numeric window handles via libnut#getWindows", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const windowList = [1, 2, 3];
            libnut.getWindows = jest.fn(() => windowList);
            // WHEN
            const windows = SUT.getWindows();
            // THEN
            await expect(libnut.getWindows).toBeCalledTimes(1);
            await expect(windows).resolves.toBe(windowList);
        });
        it("should reject on errors in libnut#getWindows", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const errorMessage = "getWindows threw";
            libnut.getWindows = jest.fn(() => {
                throw new Error(errorMessage);
            });
            // WHEN
            const windows = SUT.getWindows();
            // THEN
            await expect(libnut.getWindows).toBeCalledTimes(1);
            await expect(windows).rejects.toThrowError(errorMessage);
        });
    });
    describe("getActiveWindow", () => {
        it("should resolve to a numeric window handles via libnut#getActiveWindow", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const activeWindow = 1;
            libnut.getActiveWindow = jest.fn(() => activeWindow);
            // WHEN
            const window = SUT.getActiveWindow();
            // THEN
            await expect(libnut.getActiveWindow).toBeCalledTimes(1);
            await expect(window).resolves.toBe(activeWindow);
        });
        it("should reject on errors in libnut#getActiveWindow", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const errorMessage = "getActiveWindow threw";
            libnut.getActiveWindow = jest.fn(() => {
                throw new Error(errorMessage);
            });
            // WHEN
            const windows = SUT.getActiveWindow();
            // THEN
            await expect(libnut.getActiveWindow).toBeCalledTimes(1);
            await expect(windows).rejects.toThrowError(errorMessage);
        });
    });
    describe("getWindowRegion", () => {
        it("should resolve to a window region via libnut#getWindowRegion", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const windowHandle = 100;
            const windowRect = {
                x: 1,
                y: 2,
                width: 42,
                height: 23,
            };
            const windowRegion = new region_class_1.Region(windowRect.x, windowRect.y, windowRect.width, windowRect.height);
            libnut.getWindowRect = jest.fn(() => windowRect);
            // WHEN
            const wndRegion = SUT.getWindowRegion(windowHandle);
            // THEN
            await expect(libnut.getWindowRect).toBeCalledTimes(1);
            await expect(libnut.getWindowRect).toBeCalledWith(windowHandle);
            await expect(wndRegion).resolves.toStrictEqual(windowRegion);
        });
        it("should reject on errors in libnut#getActiveWindow", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const errorMessage = "getWindowRect threw";
            const windowHandle = 100;
            libnut.getWindowRect = jest.fn(() => {
                throw new Error(errorMessage);
            });
            // WHEN
            const windows = SUT.getWindowRegion(windowHandle);
            // THEN
            await expect(libnut.getWindowRect).toBeCalledTimes(1);
            await expect(libnut.getWindowRect).toBeCalledWith(windowHandle);
            await expect(windows).rejects.toThrowError(errorMessage);
        });
    });
    describe("getWindowTitle", () => {
        it("should resolve to a window title via libnut#getWindowTitle", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const windowTitle = "test window";
            const windowHandle = 42;
            libnut.getWindowTitle = jest.fn(() => windowTitle);
            // WHEN
            const wndRegion = SUT.getWindowTitle(windowHandle);
            // THEN
            await expect(libnut.getWindowTitle).toBeCalledTimes(1);
            await expect(libnut.getWindowTitle).toBeCalledWith(windowHandle);
            await expect(wndRegion).resolves.toBe(windowTitle);
        });
        it("should reject on errors in libnut#getActiveWindow", async () => {
            // GIVEN
            const SUT = new libnut_window_class_1.default();
            const errorMessage = "getWindowRect threw";
            const windowHandle = 42;
            libnut.getWindowTitle = jest.fn(() => {
                throw new Error(errorMessage);
            });
            // WHEN
            const windows = SUT.getWindowTitle(windowHandle);
            // THEN
            await expect(libnut.getWindowTitle).toBeCalledTimes(1);
            await expect(libnut.getWindowTitle).toBeCalledWith(windowHandle);
            await expect(windows).rejects.toThrowError(errorMessage);
        });
    });
});
//# sourceMappingURL=libnut-window.class.spec.js.map