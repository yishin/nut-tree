"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboard_class_1 = require("./clipboard.class");
const provider_registry_class_1 = __importDefault(require("./provider/provider-registry.class"));
describe("Clipboard class", () => {
    it("should paste copied input from system clipboard.", async () => {
        const SUT = new clipboard_class_1.ClipboardClass(provider_registry_class_1.default);
        const textToCopy = "bar";
        SUT.setContent(textToCopy);
        await expect(SUT.getContent()).resolves.toEqual(textToCopy);
    });
});
//# sourceMappingURL=clipboard.class.e2e.spec.js.map