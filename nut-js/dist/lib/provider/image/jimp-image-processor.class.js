"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const imageToJimp_function_1 = require("../io/imageToJimp.function");
const rgba_class_1 = require("../../rgba.class");
class default_1 {
    colorAt(image, point) {
        return new Promise(async (resolve, reject) => {
            const location = await point;
            const img = await image;
            if (location.x < 0 || location.x >= img.width) {
                reject(`Query location out of bounds. Should be in range 0 <= x < image.width, is ${location.x}`);
                return;
            }
            if (location.y < 0 || location.y >= img.height) {
                reject(`Query location out of bounds. Should be in range 0 <= y < image.height, is ${location.y}`);
                return;
            }
            const jimpImage = (0, imageToJimp_function_1.imageToJimp)(img);
            const rgba = jimp_1.default.intToRGBA(jimpImage.getPixelColor(location.x, location.y));
            resolve(new rgba_class_1.RGBA(rgba.r, rgba.g, rgba.b, rgba.a));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=jimp-image-processor.class.js.map