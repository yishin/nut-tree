"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_class_1 = require("../../image.class");
const imageToJimp_function_1 = require("./imageToJimp.function");
const jimp_1 = __importDefault(require("jimp"));
jest.mock("jimp", () => {
    class JimpMock {
        constructor() {
            this.bitmap = {
                width: 100,
                height: 100,
                data: Buffer.from([]),
            };
            this.hasAlpha = () => false;
        }
    }
    JimpMock.read = jest.fn(() => Promise.resolve(new JimpMock()));
    return {
        __esModule: true,
        default: JimpMock,
    };
});
afterEach(() => jest.resetAllMocks());
describe("imageToJimp", () => {
    it("should successfully convert an Image to a Jimp instance", async () => {
        // GIVEN
        const scanMock = jest.fn();
        jimp_1.default.prototype.scan = scanMock;
        const inputImage = new image_class_1.Image(1, 1, Buffer.from([0, 0, 0]), 3, "input_image", 4, 4);
        // WHEN
        const result = await (0, imageToJimp_function_1.imageToJimp)(inputImage);
        // THEN
        expect(result).toBeInstanceOf(jimp_1.default);
        expect(scanMock).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=imageToJimp.function.spec.js.map