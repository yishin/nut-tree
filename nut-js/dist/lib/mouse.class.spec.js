"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_enum_1 = require("./button.enum");
const mouse_class_1 = require("./mouse.class");
const point_class_1 = require("./point.class");
const linehelper_class_1 = require("./util/linehelper.class");
const sneer_1 = require("sneer");
const noop_log_provider_class_1 = require("./provider/log/noop-log-provider.class");
beforeEach(() => {
    jest.clearAllMocks();
});
const linehelper = new linehelper_class_1.LineHelper();
const providerRegistryMock = (0, sneer_1.mockPartial)({
    getMouse() {
        return (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
        });
    },
});
describe("Mouse class", () => {
    it("should have a default delay of 500 ms", () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        // WHEN
        // THEN
        expect(SUT.config.autoDelayMs).toEqual(100);
    });
    it("should forward scrollLeft to the provider", async () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        const scrollAmount = 5;
        const scrollMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
            scrollLeft: scrollMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        const result = await SUT.scrollLeft(scrollAmount);
        // THEN
        expect(scrollMock).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward scrollRight to the provider", async () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        const scrollAmount = 5;
        const scrollMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
            scrollRight: scrollMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        const result = await SUT.scrollRight(scrollAmount);
        // THEN
        expect(scrollMock).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward scrollDown to the provider", async () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        const scrollAmount = 5;
        const scrollMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
            scrollDown: scrollMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        const result = await SUT.scrollDown(scrollAmount);
        // THEN
        expect(scrollMock).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward scrollUp to the provider", async () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        const scrollAmount = 5;
        const scrollMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
            scrollUp: scrollMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        const result = await SUT.scrollUp(scrollAmount);
        // THEN
        expect(scrollMock).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("update mouse position along path on move", async () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        const path = linehelper.straightLine(new point_class_1.Point(0, 0), new point_class_1.Point(10, 10));
        const setPositionMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
            setMousePosition: setPositionMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        const result = await SUT.move(path);
        // THEN
        expect(setPositionMock).toBeCalledTimes(path.length);
        expect(result).toBe(SUT);
    });
    it("should press and hold left mouse button, move and release left mouse button on drag", async () => {
        // GIVEN
        const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
        const path = linehelper.straightLine(new point_class_1.Point(0, 0), new point_class_1.Point(10, 10));
        const setPositionMock = jest.fn();
        const pressButtonMock = jest.fn();
        const releaseButtonMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
            setMouseDelay: jest.fn(),
            setMousePosition: setPositionMock,
            pressButton: pressButtonMock,
            releaseButton: releaseButtonMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        // WHEN
        const result = await SUT.drag(path);
        // THEN
        expect(pressButtonMock).toBeCalledWith(button_enum_1.Button.LEFT);
        expect(setPositionMock).toBeCalledTimes(path.length);
        expect(releaseButtonMock).toBeCalledWith(button_enum_1.Button.LEFT);
        expect(result).toBe(SUT);
    });
    describe("Mousebuttons", () => {
        it.each([
            [button_enum_1.Button.LEFT, button_enum_1.Button.LEFT],
            [button_enum_1.Button.MIDDLE, button_enum_1.Button.MIDDLE],
            [button_enum_1.Button.RIGHT, button_enum_1.Button.RIGHT],
        ])("should be pressed and released", async (input, expected) => {
            // GIVEN
            const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
            const pressButtonMock = jest.fn();
            const releaseButtonMock = jest.fn();
            providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                setMouseDelay: jest.fn(),
                pressButton: pressButtonMock,
                releaseButton: releaseButtonMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            // WHEN
            const pressed = await SUT.pressButton(input);
            const released = await SUT.releaseButton(input);
            // THEN
            expect(pressButtonMock).toBeCalledWith(expected);
            expect(releaseButtonMock).toBeCalledWith(expected);
            expect(pressed).toBe(SUT);
            expect(released).toBe(SUT);
        });
        describe("autoDelayMs", () => {
            it("pressButton should respect configured delay", async () => {
                // GIVEN
                const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
                const delay = 100;
                SUT.config.autoDelayMs = delay;
                const mouseMock = jest.fn();
                providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                    setMouseDelay: jest.fn(),
                    pressButton: mouseMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                const start = Date.now();
                await SUT.pressButton(button_enum_1.Button.LEFT);
                const duration = Date.now() - start;
                // THEN
                expect(duration).toBeGreaterThanOrEqual(delay);
            });
            it("releaseButton should respect configured delay", async () => {
                // GIVEN
                const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
                const delay = 100;
                SUT.config.autoDelayMs = delay;
                const mouseMock = jest.fn();
                providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                    setMouseDelay: jest.fn(),
                    releaseButton: mouseMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                const start = Date.now();
                await SUT.releaseButton(button_enum_1.Button.LEFT);
                const duration = Date.now() - start;
                // THEN
                expect(duration).toBeGreaterThanOrEqual(delay);
            });
        });
    });
    describe("click and doubleClick", () => {
        describe("click", () => {
            it.each([
                [button_enum_1.Button.LEFT, button_enum_1.Button.LEFT],
                [button_enum_1.Button.MIDDLE, button_enum_1.Button.MIDDLE],
                [button_enum_1.Button.RIGHT, button_enum_1.Button.RIGHT],
            ])("should click the respective button on the provider", async (input, expected) => {
                // GIVEN
                const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
                const clickMock = jest.fn();
                providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                    setMouseDelay: jest.fn(),
                    click: clickMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.click(input);
                // THEN
                expect(clickMock).toBeCalledWith(expected);
            });
        });
        describe("doubleClick", () => {
            it.each([
                [button_enum_1.Button.LEFT, button_enum_1.Button.LEFT],
                [button_enum_1.Button.MIDDLE, button_enum_1.Button.MIDDLE],
                [button_enum_1.Button.RIGHT, button_enum_1.Button.RIGHT],
            ])("should click the respective button on the provider", async (input, expected) => {
                // GIVEN
                const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
                const clickMock = jest.fn();
                providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                    setMouseDelay: jest.fn(),
                    doubleClick: clickMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.doubleClick(input);
                // THEN
                expect(clickMock).toBeCalledWith(expected);
            });
        });
        describe("leftClick", () => {
            it("should use click internally", async () => {
                // GIVEN
                const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
                const clickSpy = jest.spyOn(SUT, "click");
                const clickMock = jest.fn();
                providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                    setMouseDelay: jest.fn(),
                    click: clickMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                const result = await SUT.leftClick();
                // THEN
                expect(clickSpy).toBeCalledWith(button_enum_1.Button.LEFT);
                expect(clickMock).toBeCalledWith(button_enum_1.Button.LEFT);
                expect(result).toBe(SUT);
            });
        });
        describe("rightClick", () => {
            it("should use click internally", async () => {
                // GIVEN
                const SUT = new mouse_class_1.MouseClass(providerRegistryMock);
                const clickSpy = jest.spyOn(SUT, "click");
                const clickMock = jest.fn();
                providerRegistryMock.getMouse = jest.fn(() => (0, sneer_1.mockPartial)({
                    setMouseDelay: jest.fn(),
                    click: clickMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                const result = await SUT.rightClick();
                // THEN
                expect(clickSpy).toBeCalledWith(button_enum_1.Button.RIGHT);
                expect(clickMock).toBeCalledWith(button_enum_1.Button.RIGHT);
                expect(result).toBe(SUT);
            });
        });
    });
});
//# sourceMappingURL=mouse.class.spec.js.map