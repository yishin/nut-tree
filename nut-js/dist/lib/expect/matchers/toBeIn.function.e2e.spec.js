"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const point_class_1 = require("../../point.class");
const region_class_1 = require("../../region.class");
const toBeIn_function_1 = require("./toBeIn.function");
jest.mock("jimp", () => { });
const targetPoint = new point_class_1.Point(400, 400);
describe(".toBeIn", () => {
    beforeEach(() => {
        index_1.mouse.setPosition(targetPoint);
    });
    it("should succeed when cursor is within correct region.", async () => {
        const targetRegion = new region_class_1.Region(350, 350, 100, 100);
        const result = await (0, toBeIn_function_1.toBeIn)(index_1.mouse, targetRegion);
        expect(result.pass).toBeTruthy();
    });
    it("should fail when cursor is outside of search region.", async () => {
        const targetRegion = new region_class_1.Region(0, 0, 100, 100);
        index_1.mouse.setPosition(targetPoint);
        const result = await (0, toBeIn_function_1.toBeIn)(index_1.mouse, targetRegion);
        expect(result.pass).toBeFalsy();
    });
});
//# sourceMappingURL=toBeIn.function.e2e.spec.js.map