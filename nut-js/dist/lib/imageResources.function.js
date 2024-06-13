"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFromUrl = exports.loadImageResource = void 0;
const path_1 = require("path");
const url_1 = require("url");
const image_class_1 = require("./image.class");
const jimp_1 = __importDefault(require("jimp"));
const colormode_enum_1 = require("./colormode.enum");
function loadImageResource(providerRegistry, resourceDirectory, fileName) {
    const fullPath = (0, path_1.normalize)((0, path_1.join)(resourceDirectory, fileName));
    return providerRegistry.getImageReader().load(fullPath);
}
exports.loadImageResource = loadImageResource;
/**
 * fetchFromUrl loads remote image content at runtime to provide it for further use in on-screen image search
 * @param url The remote URl to fetch an image from as string or {@link URL}
 * @throws On malformed URL input or in case of non-image remote content
 */
async function fetchFromUrl(url) {
    let imageUrl;
    if (url instanceof url_1.URL) {
        imageUrl = url;
    }
    else {
        try {
            imageUrl = new url_1.URL(url);
        }
        catch (e) {
            throw new Error(`Failed to fetch image data. Reason: ${e.message}`);
        }
    }
    return jimp_1.default.read(imageUrl.href)
        .then((image) => {
        return new image_class_1.Image(image.bitmap.width, image.bitmap.height, image.bitmap.data, 4, imageUrl.href, image.bitmap.data.length / (image.bitmap.width * image.bitmap.height), image.bitmap.data.length / image.bitmap.height, colormode_enum_1.ColorMode.RGB);
    })
        .catch((err) => {
        throw new Error(`Failed to parse image data. Reason: ${err.message}`);
    });
}
exports.fetchFromUrl = fetchFromUrl;
//# sourceMappingURL=imageResources.function.js.map