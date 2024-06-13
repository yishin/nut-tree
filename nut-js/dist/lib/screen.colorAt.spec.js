"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const sneer_1 = require("sneer");
const provider_registry_class_1 = __importDefault(require("./provider/provider-registry.class"));
const noop_log_provider_class_1 = require("./provider/log/noop-log-provider.class");
const searchRegion = new index_1.Region(0, 0, 1000, 1000);
const providerRegistryMock = (0, sneer_1.mockPartial)({
    getScreen() {
        return (0, sneer_1.mockPartial)({
            grabScreenRegion() {
                return Promise.resolve(new index_1.Image(searchRegion.width, searchRegion.height, Buffer.from([]), 3, "needle_image", 4, searchRegion.width * 4));
            },
            screenSize() {
                return Promise.resolve(searchRegion);
            },
        });
    },
    getImageProcessor() {
        return provider_registry_class_1.default.getImageProcessor();
    },
});
describe("colorAt", () => {
    it("should return the correct RGBA value for a given pixel", async () => {
        // GIVEN
        const screenshot = (0, index_1.loadImage)(`${__dirname}/../e2e/assets/checkers.png`);
        const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
        providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
            grabScreen: grabScreenMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        providerRegistryMock.getImageProcessor();
        const SUT = new index_1.ScreenClass(providerRegistryMock);
        const expectedWhite = new index_1.RGBA(255, 255, 255, 255);
        const expectedBlack = new index_1.RGBA(0, 0, 0, 255);
        // WHEN
        const white = await SUT.colorAt(new index_1.Point(64, 64));
        const black = await SUT.colorAt(new index_1.Point(192, 64));
        // THEN
        expect(white).toStrictEqual(expectedWhite);
        expect(black).toStrictEqual(expectedBlack);
    });
    it("should account for pixel density when retrieving pixel color", async () => {
        // GIVEN
        const screenshot = await (0, index_1.loadImage)(`${__dirname}/../e2e/assets/checkers.png`);
        screenshot.pixelDensity.scaleX = 2.0;
        screenshot.pixelDensity.scaleY = 2.0;
        const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
        providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
            grabScreen: grabScreenMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        providerRegistryMock.getImageProcessor();
        const SUT = new index_1.ScreenClass(providerRegistryMock);
        const expectedWhite = new index_1.RGBA(255, 255, 255, 255);
        const expectedBlack = new index_1.RGBA(0, 0, 0, 255);
        // WHEN
        const white = await SUT.colorAt(new index_1.Point(32, 32));
        const black = await SUT.colorAt(new index_1.Point(96, 32));
        // THEN
        expect(white).toStrictEqual(expectedWhite);
        expect(black).toStrictEqual(expectedBlack);
    });
    it("should throw on non-Point arguments", async () => {
        // GIVEN
        const grabScreenMock = jest.fn(() => Promise.resolve(new index_1.Image(10, 10, Buffer.from([]), 4, "test", 4, 10 * 4)));
        providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
            grabScreen: grabScreenMock,
        }));
        const SUT = new index_1.ScreenClass(providerRegistryMock);
        // WHEN
        const result = SUT.colorAt({ x: 10 });
        // THEN
        await expect(result).rejects.toThrowError(/^colorAt requires a Point, but received/);
    });
});
//# sourceMappingURL=screen.colorAt.spec.js.map