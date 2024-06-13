"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const point_class_1 = require("../../point.class");
const toBeAt_function_1 = require("./toBeAt.function");
jest.mock("jimp", () => { });
const targetPoint = new point_class_1.Point(100, 100);
describe(".toBeAt", () => {
    beforeEach(() => {
        index_1.mouse.setPosition(targetPoint);
    });
    it("should succeed when cursor is at right position.", async () => {
        const result = await (0, toBeAt_function_1.toBeAt)(index_1.mouse, targetPoint);
        expect(result.pass).toBeTruthy();
    });
    it("should fail when cursor is at wrong position.", async () => {
        const result = await (0, toBeAt_function_1.toBeAt)(index_1.mouse, new point_class_1.Point(10, 10));
        expect(result.pass).toBeFalsy();
    });
});
//# sourceMappingURL=toBeAt.function.e2e.spec.js.map