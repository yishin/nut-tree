"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowWithTitle = exports.textLine = exports.singleWord = exports.imageResource = exports.saveImage = exports.loadImage = exports.getActiveWindow = exports.getWindows = exports.right = exports.left = exports.down = exports.up = exports.straightTo = exports.assert = exports.screen = exports.mouse = exports.keyboard = exports.clipboard = exports.fetchFromUrl = exports.ConsoleLogLevel = exports.useConsoleLogger = exports.useLogger = exports.ColorMode = exports.FileType = exports.Window = exports.Region = exports.Point = exports.linear = exports.OptionalSearchParameters = exports.randomPointIn = exports.centerOf = exports.Button = exports.Key = exports.RGBA = exports.Image = exports.sleep = exports.jestMatchers = exports.MatchResult = exports.MatchRequest = exports.providerRegistry = exports.ScreenClass = exports.MouseClass = exports.KeyboardClass = exports.ClipboardClass = exports.AssertClass = void 0;
const assert_class_1 = require("./lib/assert.class");
Object.defineProperty(exports, "AssertClass", { enumerable: true, get: function () { return assert_class_1.AssertClass; } });
const clipboard_class_1 = require("./lib/clipboard.class");
Object.defineProperty(exports, "ClipboardClass", { enumerable: true, get: function () { return clipboard_class_1.ClipboardClass; } });
const keyboard_class_1 = require("./lib/keyboard.class");
Object.defineProperty(exports, "KeyboardClass", { enumerable: true, get: function () { return keyboard_class_1.KeyboardClass; } });
const mouse_class_1 = require("./lib/mouse.class");
Object.defineProperty(exports, "MouseClass", { enumerable: true, get: function () { return mouse_class_1.MouseClass; } });
const movement_function_1 = require("./lib/movement.function");
const screen_class_1 = require("./lib/screen.class");
Object.defineProperty(exports, "ScreenClass", { enumerable: true, get: function () { return screen_class_1.ScreenClass; } });
const linehelper_class_1 = require("./lib/util/linehelper.class");
const window_function_1 = require("./lib/window.function");
const provider_registry_class_1 = __importDefault(require("./lib/provider/provider-registry.class"));
exports.providerRegistry = provider_registry_class_1.default;
const imageResources_function_1 = require("./lib/imageResources.function");
var match_request_class_1 = require("./lib/match-request.class");
Object.defineProperty(exports, "MatchRequest", { enumerable: true, get: function () { return match_request_class_1.MatchRequest; } });
var match_result_class_1 = require("./lib/match-result.class");
Object.defineProperty(exports, "MatchResult", { enumerable: true, get: function () { return match_result_class_1.MatchResult; } });
__exportStar(require("./lib/provider"), exports);
var jest_matcher_function_1 = require("./lib/expect/jest.matcher.function");
Object.defineProperty(exports, "jestMatchers", { enumerable: true, get: function () { return jest_matcher_function_1.jestMatchers; } });
var sleep_function_1 = require("./lib/sleep.function");
Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return sleep_function_1.sleep; } });
var image_class_1 = require("./lib/image.class");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return image_class_1.Image; } });
var rgba_class_1 = require("./lib/rgba.class");
Object.defineProperty(exports, "RGBA", { enumerable: true, get: function () { return rgba_class_1.RGBA; } });
var key_enum_1 = require("./lib/key.enum");
Object.defineProperty(exports, "Key", { enumerable: true, get: function () { return key_enum_1.Key; } });
var button_enum_1 = require("./lib/button.enum");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return button_enum_1.Button; } });
var location_function_1 = require("./lib/location.function");
Object.defineProperty(exports, "centerOf", { enumerable: true, get: function () { return location_function_1.centerOf; } });
Object.defineProperty(exports, "randomPointIn", { enumerable: true, get: function () { return location_function_1.randomPointIn; } });
var optionalsearchparameters_class_1 = require("./lib/optionalsearchparameters.class");
Object.defineProperty(exports, "OptionalSearchParameters", { enumerable: true, get: function () { return optionalsearchparameters_class_1.OptionalSearchParameters; } });
var mouse_movement_function_1 = require("./lib/mouse-movement.function");
Object.defineProperty(exports, "linear", { enumerable: true, get: function () { return mouse_movement_function_1.linear; } });
var point_class_1 = require("./lib/point.class");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return point_class_1.Point; } });
var region_class_1 = require("./lib/region.class");
Object.defineProperty(exports, "Region", { enumerable: true, get: function () { return region_class_1.Region; } });
var window_class_1 = require("./lib/window.class");
Object.defineProperty(exports, "Window", { enumerable: true, get: function () { return window_class_1.Window; } });
var file_type_enum_1 = require("./lib/file-type.enum");
Object.defineProperty(exports, "FileType", { enumerable: true, get: function () { return file_type_enum_1.FileType; } });
var colormode_enum_1 = require("./lib/colormode.enum");
Object.defineProperty(exports, "ColorMode", { enumerable: true, get: function () { return colormode_enum_1.ColorMode; } });
var logging_function_1 = require("./lib/logging.function");
Object.defineProperty(exports, "useLogger", { enumerable: true, get: function () { return logging_function_1.useLogger; } });
Object.defineProperty(exports, "useConsoleLogger", { enumerable: true, get: function () { return logging_function_1.useConsoleLogger; } });
Object.defineProperty(exports, "ConsoleLogLevel", { enumerable: true, get: function () { return logging_function_1.ConsoleLogLevel; } });
__exportStar(require("./lib/query.class"), exports);
const lineHelper = new linehelper_class_1.LineHelper();
const clipboard = new clipboard_class_1.ClipboardClass(provider_registry_class_1.default);
exports.clipboard = clipboard;
const keyboard = new keyboard_class_1.KeyboardClass(provider_registry_class_1.default);
exports.keyboard = keyboard;
const mouse = new mouse_class_1.MouseClass(provider_registry_class_1.default);
exports.mouse = mouse;
const screen = new screen_class_1.ScreenClass(provider_registry_class_1.default);
exports.screen = screen;
const assert = new assert_class_1.AssertClass(screen);
exports.assert = assert;
const { straightTo, up, down, left, right } = (0, movement_function_1.createMovementApi)(provider_registry_class_1.default, lineHelper);
exports.straightTo = straightTo;
exports.up = up;
exports.down = down;
exports.left = left;
exports.right = right;
const { getWindows, getActiveWindow } = (0, window_function_1.createWindowApi)(provider_registry_class_1.default);
exports.getWindows = getWindows;
exports.getActiveWindow = getActiveWindow;
const loadImage = provider_registry_class_1.default.getImageReader().load;
exports.loadImage = loadImage;
const saveImage = provider_registry_class_1.default.getImageWriter().store;
exports.saveImage = saveImage;
const imageResource = (fileName) => (0, imageResources_function_1.loadImageResource)(provider_registry_class_1.default, screen.config.resourceDirectory, fileName);
exports.imageResource = imageResource;
const singleWord = (word) => {
    return {
        type: "text",
        id: `word-query-${word}`,
        by: {
            word,
        },
    };
};
exports.singleWord = singleWord;
const textLine = (line) => {
    return {
        type: "text",
        id: `line-query-${line}`,
        by: {
            line,
        },
    };
};
exports.textLine = textLine;
const windowWithTitle = (title) => {
    return {
        type: "window",
        id: `window-by-title-query-${title}`,
        by: {
            title,
        },
    };
};
exports.windowWithTitle = windowWithTitle;
var imageResources_function_2 = require("./lib/imageResources.function");
Object.defineProperty(exports, "fetchFromUrl", { enumerable: true, get: function () { return imageResources_function_2.fetchFromUrl; } });
//# sourceMappingURL=index.js.map