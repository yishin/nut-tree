"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageResources_function_1 = require("./imageResources.function");
const sneer_1 = require("sneer");
const path_1 = require("path");
const colormode_enum_1 = require("./colormode.enum");
const loadMock = jest.fn();
const providerRegistryMock = (0, sneer_1.mockPartial)({
    getImageReader() {
        return (0, sneer_1.mockPartial)({
            load: loadMock,
        });
    },
});
describe("imageResources", () => {
    it("should retrieve an ImageReader via providerRegistry and load an image relative to the provided resourceDirectory", async () => {
        // GIVEN
        const resourceDirectoryPath = "/foo/bar";
        const imageFileName = "image.png";
        // WHEN
        await (0, imageResources_function_1.loadImageResource)(providerRegistryMock, resourceDirectoryPath, imageFileName);
        // THEN
        expect(loadMock).toBeCalledWith((0, path_1.join)(resourceDirectoryPath, imageFileName));
    });
});
describe("fetchFromUrl", () => {
    it("should throw on malformed URLs", async () => {
        // GIVEN
        const malformedUrl = "foo";
        // WHEN
        const SUT = () => (0, imageResources_function_1.fetchFromUrl)(malformedUrl);
        // THEN
        await expect(SUT).rejects.toThrowError("Failed to fetch image data. Reason: Invalid URL");
    });
    it("should throw on non-image URLs", async () => {
        // GIVEN
        const nonImageUrl = "https://www.npmjs.com/package/jimp";
        // WHEN
        const SUT = () => (0, imageResources_function_1.fetchFromUrl)(nonImageUrl);
        // THEN
        await expect(SUT).rejects.toThrowError("Failed to parse image data. Reason: Could not find MIME for Buffer");
    });
    it("should return an RGB image from a valid URL", async () => {
        // GIVEN
        const validImageUrl = "https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png";
        const expectedDimensions = {
            width: 502,
            height: 411,
        };
        const expectedColorMode = colormode_enum_1.ColorMode.RGB;
        // WHEN
        const rgbImage = await (0, imageResources_function_1.fetchFromUrl)(validImageUrl);
        // THEN
        expect(rgbImage.colorMode).toBe(expectedColorMode);
        expect(rgbImage.width).toBe(expectedDimensions.width);
        expect(rgbImage.height).toBe(expectedDimensions.height);
    });
});
//# sourceMappingURL=imageResources.function.spec.js.map