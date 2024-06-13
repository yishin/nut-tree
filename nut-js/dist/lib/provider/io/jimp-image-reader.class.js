"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const image_class_1 = require("../../image.class");
const colormode_enum_1 = require("../../colormode.enum");
class default_1 {
    load(parameters) {
        return new Promise((resolve, reject) => {
            jimp_1.default.read(parameters)
                .then((jimpImage) => {
                // stay consistent with images retrieved from libnut which uses BGR format
                jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function (_, __, idx) {
                    const red = this.bitmap.data[idx];
                    this.bitmap.data[idx] = this.bitmap.data[idx + 2];
                    this.bitmap.data[idx + 2] = red;
                });
                resolve(new image_class_1.Image(jimpImage.bitmap.width, jimpImage.bitmap.height, jimpImage.bitmap.data, jimpImage.hasAlpha() ? 4 : 3, parameters, jimpImage.bitmap.data.length /
                    (jimpImage.bitmap.width * jimpImage.bitmap.height), jimpImage.bitmap.data.length / jimpImage.bitmap.height, colormode_enum_1.ColorMode.BGR));
            })
                .catch((err) => reject(`Failed to load image from '${parameters}'. Reason: ${err}`));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=jimp-image-reader.class.js.map