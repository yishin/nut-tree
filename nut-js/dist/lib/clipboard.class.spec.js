"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clipboard_class_1 = require("./clipboard.class");
const sneer_1 = require("sneer");
const noop_log_provider_class_1 = require("./provider/log/noop-log-provider.class");
jest.mock("jimp", () => { });
beforeEach(() => {
    jest.clearAllMocks();
});
const providerRegistryMock = (0, sneer_1.mockPartial)({});
describe("Clipboard class", () => {
    it("should call providers copy method.", () => {
        // GIVEN
        const SUT = new clipboard_class_1.ClipboardClass(providerRegistryMock);
        const copyMock = jest.fn();
        providerRegistryMock.getClipboard = jest.fn(() => (0, sneer_1.mockPartial)({
            copy: copyMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        const textToCopy = "bar";
        // WHEN
        SUT.setContent(textToCopy);
        // THEN
        expect(copyMock).toHaveBeenCalledTimes(1);
        expect(copyMock).toHaveBeenCalledWith(textToCopy);
    });
    it("should call providers paste method.", () => {
        // GIVEN
        const SUT = new clipboard_class_1.ClipboardClass(providerRegistryMock);
        const pasteMock = jest.fn();
        providerRegistryMock.getClipboard = jest.fn(() => (0, sneer_1.mockPartial)({
            paste: pasteMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        SUT.getContent();
        // THEN
        expect(pasteMock).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=clipboard.class.spec.js.map