"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_class_1 = require("./point.class");
describe("Point", () => {
    it("should return a proper string representation.", () => {
        const point = new point_class_1.Point(10, 15);
        const expected = "(10, 15)";
        expect(point.toString()).toEqual(expected);
    });
    describe("isPoint typeguard", () => {
        it("should identify a Point", () => {
            // GIVEN
            const p = new point_class_1.Point(100, 100);
            // WHEN
            const result = (0, point_class_1.isPoint)(p);
            // THEN
            expect(result).toBeTruthy();
        });
        it("should rule out non-objects", () => {
            // GIVEN
            const p = "foo";
            // WHEN
            const result = (0, point_class_1.isPoint)(p);
            // THEN
            expect(result).toBeFalsy();
        });
        it("should rule out possible object with missing properties", () => {
            // GIVEN
            const p = {
                x: 100,
            };
            // WHEN
            const result = (0, point_class_1.isPoint)(p);
            // THEN
            expect(result).toBeFalsy();
        });
        it("should rule out possible object with wrong property type", () => {
            // GIVEN
            const p = {
                x: 100,
                y: "foo",
            };
            // WHEN
            const result = (0, point_class_1.isPoint)(p);
            // THEN
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=point.class.spec.js.map