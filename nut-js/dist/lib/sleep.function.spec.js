"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_function_1 = require("./sleep.function");
const maxTimeDeltaInMs = 3;
jest.mock("jimp", () => { });
describe("sleep", () => {
    it("should resolve after x ms", async () => {
        // GIVEN
        const timeout = 500;
        // WHEN
        const before = Date.now();
        await (0, sleep_function_1.sleep)(timeout);
        const after = Date.now();
        // THEN
        expect(after - before).toBeGreaterThanOrEqual(timeout - maxTimeDeltaInMs);
    });
});
describe("busyWaitForNanoSeconds", () => {
    it("should resolve after x ns", async () => {
        // GIVEN
        const timeoutNs = 5000000;
        const timeoutMs = 5;
        // WHEN
        const before = Date.now();
        await (0, sleep_function_1.busyWaitForNanoSeconds)(timeoutNs);
        const after = Date.now();
        // THEN
        expect(after - before).toBeGreaterThanOrEqual(timeoutMs - maxTimeDeltaInMs);
    });
});
//# sourceMappingURL=sleep.function.spec.js.map