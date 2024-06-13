"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mouse_movement_function_1 = require("./mouse-movement.function");
describe("MovementType", () => {
    describe("baseStepDuration", () => {
        it("should calculate the base step duration in nanoseconds", () => {
            // GIVEN
            const speedInPixelsPerSecond = 1000;
            const expectedBaseStepDuration = 1000000;
            // WHEN
            const result = (0, mouse_movement_function_1.calculateStepDuration)(speedInPixelsPerSecond);
            // THEN
            expect(result).toBe(expectedBaseStepDuration);
        });
    });
    describe("stepDuration", () => {
        it("should call easing function progress to calculate current step duration", () => {
            // GIVEN
            const amountOfSteps = 100;
            const speedInPixelsPerSecond = 1000;
            const easingFunction = jest.fn(() => 0);
            // WHEN
            (0, mouse_movement_function_1.calculateMovementTimesteps)(amountOfSteps, speedInPixelsPerSecond, easingFunction);
            // THEN
            expect(easingFunction).toBeCalledTimes(amountOfSteps);
        });
    });
    describe("linear", () => {
        it("should return a set of linear timesteps, 1000000 nanosecond per step.", () => {
            // GIVEN
            const expected = [1000000, 1000000, 1000000, 1000000, 1000000, 1000000];
            // WHEN
            const result = (0, mouse_movement_function_1.calculateMovementTimesteps)(6, 1000, mouse_movement_function_1.linear);
            // THEN
            expect(result).toEqual(expected);
        });
        it("should should return a set of linear timesteps, 2000000 nanoseconds per step.", () => {
            // GIVEN
            const expected = [2000000, 2000000, 2000000, 2000000, 2000000, 2000000];
            // WHEN
            const result = (0, mouse_movement_function_1.calculateMovementTimesteps)(6, 500, mouse_movement_function_1.linear);
            // THEN
            expect(result).toEqual(expected);
        });
    });
    describe("non-linear", () => {
        it("should return progress slowly in the first half, 2000000 nanoseconds per step, then continue with normal speed, 1000000 nanoseconds per step", () => {
            // GIVEN
            const mouseSpeed = 1000;
            const easingFunction = (p) => {
                if (p < 0.5) {
                    return -0.5;
                }
                return 0;
            };
            const expected = [2000000, 2000000, 2000000, 1000000, 1000000, 1000000];
            // WHEN
            const result = (0, mouse_movement_function_1.calculateMovementTimesteps)(6, mouseSpeed, easingFunction);
            // THEN
            expect(result).toEqual(expected);
        });
    });
});
//# sourceMappingURL=mouse-movement.function.spec.js.map