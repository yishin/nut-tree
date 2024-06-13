"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const image_class_1 = require("../../image.class");
const region_class_1 = require("../../region.class");
const colormode_enum_1 = require("../../colormode.enum");
class ScreenAction {
    static determinePixelDensity(screen, screenShot) {
        return {
            scaleX: screenShot.width / screen.width,
            scaleY: screenShot.height / screen.height,
        };
    }
    constructor() { }
    grabScreen() {
        return new Promise((resolve, reject) => {
            const screenShot = libnut.screen.capture();
            if (screenShot) {
                const screenSize = libnut.getScreenSize();
                const pixelScaling = ScreenAction.determinePixelDensity(new region_class_1.Region(0, 0, screenSize.width, screenSize.height), screenShot);
                resolve(new image_class_1.Image(screenShot.width, screenShot.height, screenShot.image, 4, "grabScreenResult", screenShot.bitsPerPixel, screenShot.byteWidth, colormode_enum_1.ColorMode.BGR, pixelScaling));
            }
            else {
                reject("Unable to fetch screen content.");
            }
        });
    }
    grabScreenRegion(region) {
        return new Promise((resolve, reject) => {
            const screenShot = libnut.screen.capture(region.left, region.top, region.width, region.height);
            if (screenShot) {
                const pixelScaling = ScreenAction.determinePixelDensity(region, screenShot);
                resolve(new image_class_1.Image(screenShot.width, screenShot.height, screenShot.image, 4, "grabScreenRegionResult", 4, screenShot.width * 4, colormode_enum_1.ColorMode.BGR, pixelScaling));
            }
            else {
                reject("Unable to fetch screen content.");
            }
        });
    }
    highlightScreenRegion(region, duration, opacity) {
        return new Promise((resolve) => {
            libnut.screen.highlight(region.left, region.top, region.width, region.height, duration, opacity);
            resolve();
        });
    }
    screenWidth() {
        return new Promise((resolve, reject) => {
            try {
                const size = libnut.getScreenSize();
                resolve(size.width);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    screenHeight() {
        return new Promise((resolve, reject) => {
            try {
                const size = libnut.getScreenSize();
                resolve(size.height);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    screenSize() {
        return new Promise((resolve, reject) => {
            try {
                const screenSize = libnut.getScreenSize();
                resolve(new region_class_1.Region(0, 0, screenSize.width, screenSize.height));
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.default = ScreenAction;
//# sourceMappingURL=libnut-screen.class.js.map