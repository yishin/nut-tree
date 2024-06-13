"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const window_class_1 = require("./window.class");
const sneer_1 = require("sneer");
jest.mock("jimp", () => { });
describe("Window class", () => {
    it("should retrieve the window region via provider", async () => {
        // GIVEN
        const windowMock = jest.fn();
        const providerRegistryMock = (0, sneer_1.mockPartial)({
            getWindow() {
                return (0, sneer_1.mockPartial)({
                    getWindowRegion: windowMock,
                });
            },
        });
        const mockWindowHandle = 123;
        const SUT = new window_class_1.Window(providerRegistryMock, mockWindowHandle);
        // WHEN
        await SUT.region;
        // THEN
        expect(windowMock).toBeCalledTimes(1);
        expect(windowMock).toBeCalledWith(mockWindowHandle);
    });
    it("should retrieve the window title via provider", async () => {
        // GIVEN
        const windowMock = jest.fn();
        const providerRegistryMock = (0, sneer_1.mockPartial)({
            getWindow() {
                return (0, sneer_1.mockPartial)({
                    getWindowTitle: windowMock,
                });
            },
        });
        const mockWindowHandle = 123;
        const SUT = new window_class_1.Window(providerRegistryMock, mockWindowHandle);
        // WHEN
        await SUT.title;
        // THEN
        expect(windowMock).toBeCalledTimes(1);
        expect(windowMock).toBeCalledWith(mockWindowHandle);
    });
});
//# sourceMappingURL=window.class.spec.js.map