"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_image_reader_class_1 = __importDefault(require("./jimp-image-reader.class"));
const path_1 = require("path");
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
describe("Jimp image reader", () => {
    it("should return an Image object", async () => {
        // GIVEN
        const inputPath = (0, path_1.join)(__dirname, "__mocks__", "calculator.png");
        const scanMock = jest.fn();
        jimp_1.default.prototype.scan = scanMock;
        const SUT = new jimp_image_reader_class_1.default();
        // WHEN
        await SUT.load(inputPath);
        // THEN
        expect(scanMock).toHaveBeenCalledTimes(1);
        expect(jimp_1.default.read).toBeCalledTimes(1);
        expect(jimp_1.default.read).toBeCalledWith(inputPath);
    });
    it("should reject on loading failures", async () => {
        // GIVEN
        const inputPath = "/some/path/to/file";
        const expectedError = "Error during load";
        const SUT = new jimp_image_reader_class_1.default();
        jimp_1.default.read = jest.fn(() => {
            throw new Error(expectedError);
        });
        // WHEN
        try {
            await SUT.load(inputPath);
        }
        catch (err) {
            // THEN
            expect(err).toStrictEqual(Error(expectedError));
        }
    });
});
//# sourceMappingURL=jimp-image-reader.class.spec.js.map