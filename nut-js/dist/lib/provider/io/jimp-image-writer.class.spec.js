"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_image_writer_class_1 = __importDefault(require("./jimp-image-writer.class"));
const image_class_1 = require("../../image.class");
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
describe("Jimp image writer", () => {
    it("should reject on writing failures", async () => {
        // GIVEN
        const outputFileName = "/does/not/compute.png";
        const outputFile = new image_class_1.Image(100, 200, Buffer.from([]), 3, outputFileName, 4, 100 * 4);
        const writeMock = jest.fn(() => Promise.resolve(new jimp_1.default()));
        const scanMock = jest.fn();
        jimp_1.default.prototype.scan = scanMock;
        jimp_1.default.prototype.writeAsync = writeMock;
        const SUT = new jimp_image_writer_class_1.default();
        // WHEN
        await SUT.store({ image: outputFile, path: outputFileName });
        // THEN
        expect(scanMock).toHaveBeenCalledTimes(1);
        expect(writeMock).toHaveBeenCalledTimes(1);
        expect(writeMock).toHaveBeenCalledWith(outputFileName);
    });
});
//# sourceMappingURL=jimp-image-writer.class.spec.js.map