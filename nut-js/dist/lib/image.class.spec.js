"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_class_1 = require("./image.class");
const imageToJimp_function_1 = require("./provider/io/imageToJimp.function");
const colormode_enum_1 = require("./colormode.enum");
jest.mock("./provider/io/imageToJimp.function", () => {
    return {
        imageToJimp: jest.fn(),
    };
});
afterEach(() => {
    jest.resetAllMocks();
});
describe("Image class", () => {
    it("should return alphachannel = true for > 3 channels", () => {
        const SUT = new image_class_1.Image(200, 200, Buffer.from([123]), 4, "id", 4, 200 * 4);
        expect(SUT.hasAlphaChannel).toBeTruthy();
    });
    it("should return alphachannel = false for <= 3 channels", () => {
        const SUT = new image_class_1.Image(200, 200, Buffer.from([123]), 3, "id", 4, 200 * 4);
        expect(SUT.hasAlphaChannel).toBeFalsy();
    });
    it("should return alphachannel = false for <= 3 channels", () => {
        const SUT = new image_class_1.Image(200, 200, Buffer.from([123]), 2, "id", 4, 200 * 4);
        expect(SUT.hasAlphaChannel).toBeFalsy();
    });
    it("should return alphachannel = false for <= 3 channels", () => {
        const SUT = new image_class_1.Image(200, 200, Buffer.from([123]), 1, "id", 4, 200 * 4);
        expect(SUT.hasAlphaChannel).toBeFalsy();
    });
    it("should throw for <= 0 channels", () => {
        expect(() => new image_class_1.Image(200, 200, Buffer.from([123]), 0, "id", 4, 200 * 4)).toThrowError("Channel <= 0");
    });
    it("should have a default pixel density of 1.0", () => {
        const SUT = new image_class_1.Image(200, 200, Buffer.from([123]), 1, "id", 4, 200 * 4);
        expect(SUT.pixelDensity).toEqual({ scaleX: 1.0, scaleY: 1.0 });
    });
    describe("Colormode", () => {
        it("should not try to convert an image to BGR if it already has the correct color mode", async () => {
            // GIVEN
            const bgrImage = new image_class_1.Image(100, 100, Buffer.from([]), 3, "testImage", 4, 200 * 4);
            // WHEN
            const convertedImage = await bgrImage.toBGR();
            // THEN
            expect(convertedImage).toBe(bgrImage);
            expect(imageToJimp_function_1.imageToJimp).not.toBeCalledTimes(1);
        });
        it("should not try to convert an image to RGB if it already has the correct color mode", async () => {
            // GIVEN
            const rgbImage = new image_class_1.Image(100, 100, Buffer.from([]), 3, "testImage", 4, 200 * 4, colormode_enum_1.ColorMode.RGB);
            // WHEN
            const convertedImage = await rgbImage.toRGB();
            // THEN
            expect(convertedImage).toBe(rgbImage);
            expect(imageToJimp_function_1.imageToJimp).not.toBeCalledTimes(1);
        });
    });
    describe("isImage typeguard", () => {
        it("should identify an Image", () => {
            // GIVEN
            const img = new image_class_1.Image(100, 100, Buffer.from([]), 4, "foo", 4, 200 * 4);
            // WHEN
            const result = (0, image_class_1.isImage)(img);
            // THEN
            expect(result).toBeTruthy();
        });
        it("should rule out non-objects", () => {
            // GIVEN
            const i = "foo";
            // WHEN
            const result = (0, image_class_1.isImage)(i);
            // THEN
            expect(result).toBeFalsy();
        });
        it("should rule out possible object with missing properties", () => {
            // GIVEN
            const img = {
                width: 100,
                height: 100,
                data: Buffer.from([]),
                channels: "foo",
                id: "foo",
                colorMode: colormode_enum_1.ColorMode.BGR,
            };
            // WHEN
            const result = (0, image_class_1.isImage)(img);
            // THEN
            expect(result).toBeFalsy();
        });
        it("should rule out possible object with wrong property type", () => {
            // GIVEN
            const img = {
                width: 100,
                height: 100,
                data: Buffer.from([]),
                channels: "foo",
                id: "foo",
                colorMode: colormode_enum_1.ColorMode.BGR,
                pixelDensity: 25,
            };
            // WHEN
            const result = (0, image_class_1.isImage)(img);
            // THEN
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=image.class.spec.js.map