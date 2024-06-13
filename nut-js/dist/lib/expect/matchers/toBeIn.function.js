"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBeIn = void 0;
const toBeIn = async (received, region) => {
    const currentPosition = await received.getPosition();
    const inX = currentPosition.x >= region.left &&
        currentPosition.x <= region.left + region.width;
    const inY = currentPosition.y >= region.top &&
        currentPosition.y <= region.top + region.height;
    const success = inX && inY;
    if (success) {
        return {
            message: () => `Expected cursor to be outside of region ${region.toString()}`,
            pass: true,
        };
    }
    return {
        message: () => `Cursor should be within region ${region.toString()} but is at ${currentPosition.toString()}`,
        pass: false,
    };
};
exports.toBeIn = toBeIn;
//# sourceMappingURL=toBeIn.function.js.map