"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const window_function_1 = require("./window.function");
const window_class_1 = require("./window.class");
const provider_registry_class_1 = __importDefault(require("./provider/provider-registry.class"));
jest.mock("jimp", () => { });
describe("WindowApi", () => {
    describe("getWindows", () => {
        it("should return a list of open Windows", async () => {
            // GIVEN
            const SUT = (0, window_function_1.createWindowApi)(provider_registry_class_1.default);
            // WHEN
            const windows = await SUT.getWindows();
            // THEN
            windows.forEach((wnd) => {
                expect(wnd).toEqual(expect.any(window_class_1.Window));
            });
        });
    });
    describe("getActiveWindow", () => {
        it("should return the a single Window which is currently active", async () => {
            // GIVEN
            const SUT = (0, window_function_1.createWindowApi)(provider_registry_class_1.default);
            // WHEN
            const window = await SUT.getActiveWindow();
            // THEN
            expect(window).toEqual(expect.any(window_class_1.Window));
        });
    });
});
//# sourceMappingURL=window.function.spec.js.map