"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const image_class_1 = require("./image.class");
const match_request_class_1 = require("./match-request.class");
const match_result_class_1 = require("./match-result.class");
const region_class_1 = require("./region.class");
const screen_class_1 = require("./screen.class");
const sneer_1 = require("sneer");
const optionalsearchparameters_class_1 = require("./optionalsearchparameters.class");
const noop_log_provider_class_1 = require("./provider/log/noop-log-provider.class");
jest.mock("jimp", () => { });
const searchRegion = new region_class_1.Region(0, 0, 1000, 1000);
const providerRegistryMock = (0, sneer_1.mockPartial)({
    getScreen() {
        return (0, sneer_1.mockPartial)({
            grabScreenRegion() {
                return Promise.resolve(new image_class_1.Image(searchRegion.width, searchRegion.height, Buffer.from([]), 3, "needle_image", 4, searchRegion.width * 4));
            },
            screenSize() {
                return Promise.resolve(searchRegion);
            },
        });
    },
});
beforeEach(() => {
    jest.resetAllMocks();
});
describe("Screen.", () => {
    describe("find", () => {
        describe("queries", () => {
            it("should choose the correct finder implementation for images", async () => {
                // GIVEN
                const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
                const needlePromise = Promise.resolve(needle);
                const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
                providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                    findMatch: findMatchMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.find(needlePromise);
                // THEN
                expect(findMatchMock).toHaveBeenCalledTimes(1);
            });
            it("should choose the correct finder implementation for window queries", async () => {
                // GIVEN
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                const needle = {
                    id: "window-query",
                    type: "window",
                    by: {
                        title: "query",
                    },
                };
                const findMatchMock = jest.fn(() => Promise.resolve(1234));
                providerRegistryMock.getWindowFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                    findMatch: findMatchMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.find(needle);
                // THEN
                expect(findMatchMock).toHaveBeenCalledTimes(1);
            });
            it.each([
                {
                    id: "dummy",
                    type: "text",
                    by: {
                        word: "dummy-query",
                    },
                },
                {
                    id: "dummy",
                    type: "text",
                    by: {
                        line: "dummy-query",
                    },
                },
            ])("should choose the correct finder implementation for text queries", async (needle) => {
                // GIVEN
                const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
                providerRegistryMock.getTextFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                    findMatch: findMatchMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.find(needle);
                // THEN
                expect(findMatchMock).toHaveBeenCalledTimes(1);
            });
        });
        it("should throw on invalid search input", async () => {
            // GIVEN
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            // WHEN
            const result = SUT.find({ foo: "bar" });
            // THEN
            await expect(result).rejects.toThrowError(/find requires an Image, a text query or a window query.*/);
        });
        it("should resolve with sufficient confidence.", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const needlePromise = Promise.resolve(needle);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            // WHEN
            const resultRegion = SUT.find(needlePromise);
            // THEN
            await expect(resultRegion).resolves.toEqual(matchResult.location);
            const matchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, SUT.config.confidence);
            expect(findMatchMock).toHaveBeenCalledWith(matchRequest);
        });
        it("should call registered hook before resolve", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            SUT.on(needle, testCallback);
            // WHEN
            await SUT.find(needle);
            // THEN
            expect(testCallback).toBeCalledTimes(1);
            expect(testCallback).toBeCalledWith(matchResult);
        });
        it("should call multiple registered hooks before resolve", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const secondCallback = jest.fn(() => Promise.resolve());
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            SUT.on(needle, testCallback);
            SUT.on(needle, secondCallback);
            // WHEN
            await SUT.find(needle);
            // THEN
            for (const callback of [testCallback, secondCallback]) {
                expect(callback).toBeCalledTimes(1);
                expect(callback).toBeCalledWith(matchResult);
            }
        });
        it("should reject with insufficient confidence.", async () => {
            // GIVEN
            const minConfidence = 0.95;
            const failingConfidence = 0.8;
            const expectedReason = `No match with required confidence ${minConfidence}. Best match: ${failingConfidence}`;
            const findMatchMock = jest.fn(() => Promise.reject(expectedReason));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const id = "needle_image";
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, id, 4, 100 * 4);
            // WHEN
            const resultRegion = SUT.find(needle, { confidence: minConfidence });
            // THEN
            await expect(resultRegion).rejects.toThrowError(`Searching for ${id} failed. Reason: '${expectedReason}'`);
        });
        it("should reject when search fails.", async () => {
            // GIVEN
            const rejectionReason = "Search failed.";
            const findMatchMock = jest.fn(() => Promise.reject(rejectionReason));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const id = "needle_image";
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, id, 4, 100 * 4);
            // WHEN
            const resultRegion = SUT.find(needle);
            // THEN
            await expect(resultRegion).rejects.toThrowError(`Searching for ${id} failed. Reason: '${rejectionReason}'`);
        });
        it("should override default confidence value with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const matchResult = new match_result_class_1.MatchResult(minMatch, searchRegion);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const parameters = new optionalsearchparameters_class_1.OptionalSearchParameters(undefined, minMatch);
            // WHEN
            const resultRegion = SUT.find(needle, parameters);
            // THEN
            await expect(resultRegion).resolves.toEqual(matchResult.location);
            const matchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, minMatch);
            expect(findMatchMock).toHaveBeenCalledWith(matchRequest);
        });
        it("should override default search region with parameter.", async () => {
            // GIVEN
            const customSearchRegion = new region_class_1.Region(10, 10, 90, 90);
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const parameters = new optionalsearchparameters_class_1.OptionalSearchParameters(customSearchRegion);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, SUT.config.confidence);
            // WHEN
            await SUT.find(needle, parameters);
            // THEN
            expect(findMatchMock).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should override both confidence and search region with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const customSearchRegion = new region_class_1.Region(10, 10, 90, 90);
            const matchResult = new match_result_class_1.MatchResult(minMatch, searchRegion);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const parameters = new optionalsearchparameters_class_1.OptionalSearchParameters(customSearchRegion, minMatch);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, minMatch);
            // WHEN
            await SUT.find(needle, parameters);
            // THEN
            expect(findMatchMock).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should add search region offset to result image location", async () => {
            // GIVEN
            const limitedSearchRegion = new region_class_1.Region(100, 200, 300, 400);
            const resultRegion = new region_class_1.Region(50, 100, 150, 200);
            const matchResult = new match_result_class_1.MatchResult(0.99, resultRegion);
            const expectedMatchRegion = new region_class_1.Region(limitedSearchRegion.left + resultRegion.left, limitedSearchRegion.top + resultRegion.top, resultRegion.width, resultRegion.height);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            // WHEN
            const matchRegion = await SUT.find(new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4), {
                searchRegion: limitedSearchRegion,
            });
            // THEN
            expect(matchRegion).toEqual(expectedMatchRegion);
        });
        it.each([
            ["with negative x coordinate", new region_class_1.Region(-1, 0, 100, 100)],
            ["with negative y coordinate", new region_class_1.Region(0, -1, 100, 100)],
            ["with negative width", new region_class_1.Region(0, 0, -100, 100)],
            ["with negative height", new region_class_1.Region(0, 0, 100, -100)],
            ["with region outside screen on x axis", new region_class_1.Region(1100, 0, 100, 100)],
            ["with region outside screen on y axis", new region_class_1.Region(0, 1100, 100, 100)],
            ["with region bigger than screen on x axis", new region_class_1.Region(0, 0, 1100, 100)],
            [
                "with region bigger than screen on y axis",
                new region_class_1.Region(0, 0, 1000, 1100),
            ],
            ["with region of 1 px width", new region_class_1.Region(0, 0, 1, 1100)],
            ["with region of 1 px height", new region_class_1.Region(0, 0, 100, 1)],
            ["with region leaving screen on x axis", new region_class_1.Region(600, 0, 500, 100)],
            ["with region leaving screen on y axis", new region_class_1.Region(0, 500, 100, 600)],
            [
                "with NaN x coordinate",
                new region_class_1.Region("a", 0, 100, 100),
            ],
            [
                "with NaN y coordinate",
                new region_class_1.Region(0, "a", 100, 600),
            ],
            ["with NaN on width", new region_class_1.Region(0, 0, "a", 100)],
            ["with NaN on height", new region_class_1.Region(0, 0, 100, "a")],
        ])("should reject search regions %s", async (_, region) => {
            // GIVEN
            const id = "needle_image";
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, id, 4, 100 * 4);
            const matchResult = new match_result_class_1.MatchResult(0.99, region);
            const findMatchMock = jest.fn(() => Promise.resolve(matchResult));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatch: findMatchMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            // WHEN
            const findPromise = SUT.find(needle, {
                searchRegion: region,
            });
            // THEN
            await expect(findPromise).rejects.toThrowError(`Searching for ${id} failed. Reason:`);
        });
    });
    describe("findAll", () => {
        describe("queries", () => {
            it("should throw on invalid search input", async () => {
                // GIVEN
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                // WHEN
                const result = SUT.findAll({ foo: "bar" });
                // THEN
                await expect(result).rejects.toThrowError(/findAll requires an Image, a text query or a window query.*/);
            });
            it("should choose the correct finder implementation for images", async () => {
                // GIVEN
                const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
                const needlePromise = Promise.resolve(needle);
                const findMatchMock = jest.fn(() => Promise.resolve([matchResult]));
                providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                    findMatches: findMatchMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.findAll(needlePromise);
                // THEN
                expect(findMatchMock).toHaveBeenCalledTimes(1);
            });
            it("should choose the correct finder implementation for window queries", async () => {
                // GIVEN
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                const needle = {
                    id: "window-query",
                    type: "window",
                    by: {
                        title: "query",
                    },
                };
                const findMatchMock = jest.fn(() => Promise.resolve([1234]));
                providerRegistryMock.getWindowFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                    findMatches: findMatchMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.findAll(needle);
                // THEN
                expect(findMatchMock).toHaveBeenCalledTimes(1);
            });
            it.each([
                {
                    id: "dummy",
                    type: "text",
                    by: {
                        word: "dummy-query",
                    },
                },
                {
                    id: "dummy",
                    type: "text",
                    by: {
                        line: "dummy-query",
                    },
                },
            ])("should choose the correct finder implementation for text queries", async (needle) => {
                // GIVEN
                const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
                const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
                const findMatchMock = jest.fn(() => Promise.resolve([matchResult]));
                providerRegistryMock.getTextFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                    findMatches: findMatchMock,
                }));
                providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
                // WHEN
                await SUT.findAll(needle);
                // THEN
                expect(findMatchMock).toHaveBeenCalledTimes(1);
            });
        });
        it("should call registered hook before resolve", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const matchResults = [matchResult, matchResult, matchResult];
            const findMatchesMock = jest.fn(() => Promise.resolve(matchResults));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            SUT.on(needle, testCallback);
            // WHEN
            await SUT.findAll(needle);
            // THEN
            expect(testCallback).toBeCalledTimes(matchResults.length);
            expect(testCallback).toBeCalledWith(matchResult);
        });
        it("should call multiple registered hooks before resolve", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const matchResults = [matchResult, matchResult, matchResult];
            const findMatchesMock = jest.fn(() => Promise.resolve(matchResults));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const secondCallback = jest.fn(() => Promise.resolve());
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            SUT.on(needle, testCallback);
            SUT.on(needle, secondCallback);
            // WHEN
            await SUT.findAll(needle);
            // THEN
            for (const callback of [testCallback, secondCallback]) {
                expect(callback).toBeCalledTimes(matchResults.length);
                expect(callback).toBeCalledWith(matchResult);
            }
        });
        it("should reject when search fails.", async () => {
            // GIVEN
            const rejectionReason = "Search failed.";
            const findMatchesMock = jest.fn(() => Promise.reject(rejectionReason));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const id = "needle_image";
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, id, 4, 100 * 4);
            // WHEN
            const resultRegion = SUT.findAll(needle);
            // THEN
            await expect(resultRegion).rejects.toThrowError(`Searching for ${id} failed. Reason: '${rejectionReason}'`);
        });
        it("should override default confidence value with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const matchResult = new match_result_class_1.MatchResult(minMatch, searchRegion);
            const findMatchesMock = jest.fn(() => Promise.resolve([matchResult]));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const parameters = new optionalsearchparameters_class_1.OptionalSearchParameters(undefined, minMatch);
            // WHEN
            const [resultRegion] = await SUT.findAll(needle, parameters);
            // THEN
            expect(resultRegion).toEqual(matchResult.location);
            const matchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, minMatch);
            expect(findMatchesMock).toHaveBeenCalledWith(matchRequest);
        });
        it("should override default search region with parameter.", async () => {
            // GIVEN
            const customSearchRegion = new region_class_1.Region(10, 10, 90, 90);
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            const findMatchesMock = jest.fn(() => Promise.resolve([matchResult]));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const parameters = new optionalsearchparameters_class_1.OptionalSearchParameters(customSearchRegion);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, SUT.config.confidence);
            // WHEN
            await SUT.findAll(needle, parameters);
            // THEN
            expect(findMatchesMock).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should override both confidence and search region with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const customSearchRegion = new region_class_1.Region(10, 10, 90, 90);
            const matchResult = new match_result_class_1.MatchResult(minMatch, searchRegion);
            const findMatchesMock = jest.fn(() => Promise.resolve([matchResult]));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4);
            const parameters = new optionalsearchparameters_class_1.OptionalSearchParameters(customSearchRegion, minMatch);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), needle, minMatch);
            // WHEN
            await SUT.findAll(needle, parameters);
            // THEN
            expect(findMatchesMock).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should add search region offset to result image location", async () => {
            // GIVEN
            const limitedSearchRegion = new region_class_1.Region(100, 200, 300, 400);
            const resultRegion = new region_class_1.Region(50, 100, 150, 200);
            const matchResult = new match_result_class_1.MatchResult(0.99, resultRegion);
            const expectedMatchRegion = new region_class_1.Region(limitedSearchRegion.left + resultRegion.left, limitedSearchRegion.top + resultRegion.top, resultRegion.width, resultRegion.height);
            const findMatchesMock = jest.fn(() => Promise.resolve([matchResult]));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            // WHEN
            const [matchRegion] = await SUT.findAll(new image_class_1.Image(100, 100, Buffer.from([]), 3, "needle_image", 4, 100 * 4), {
                searchRegion: limitedSearchRegion,
            });
            // THEN
            expect(matchRegion).toEqual(expectedMatchRegion);
        });
        it.each([
            ["with negative x coordinate", new region_class_1.Region(-1, 0, 100, 100)],
            ["with negative y coordinate", new region_class_1.Region(0, -1, 100, 100)],
            ["with negative width", new region_class_1.Region(0, 0, -100, 100)],
            ["with negative height", new region_class_1.Region(0, 0, 100, -100)],
            ["with region outside screen on x axis", new region_class_1.Region(1100, 0, 100, 100)],
            ["with region outside screen on y axis", new region_class_1.Region(0, 1100, 100, 100)],
            ["with region bigger than screen on x axis", new region_class_1.Region(0, 0, 1100, 100)],
            [
                "with region bigger than screen on y axis",
                new region_class_1.Region(0, 0, 1000, 1100),
            ],
            ["with region of 1 px width", new region_class_1.Region(0, 0, 1, 1100)],
            ["with region of 1 px height", new region_class_1.Region(0, 0, 100, 1)],
            ["with region leaving screen on x axis", new region_class_1.Region(600, 0, 500, 100)],
            ["with region leaving screen on y axis", new region_class_1.Region(0, 500, 100, 600)],
            [
                "with NaN x coordinate",
                new region_class_1.Region("a", 0, 100, 100),
            ],
            [
                "with NaN y coordinate",
                new region_class_1.Region(0, "a", 100, 600),
            ],
            ["with NaN on width", new region_class_1.Region(0, 0, "a", 100)],
            ["with NaN on height", new region_class_1.Region(0, 0, 100, "a")],
        ])("should reject search regions %s", async (_, region) => {
            // GIVEN
            const id = "needle_image";
            const needle = new image_class_1.Image(100, 100, Buffer.from([]), 3, id, 4, 100 * 4);
            const matchResult = new match_result_class_1.MatchResult(0.99, region);
            const findMatchesMock = jest.fn(() => Promise.resolve([matchResult]));
            providerRegistryMock.getImageFinder = jest.fn(() => (0, sneer_1.mockPartial)({
                findMatches: findMatchesMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            // WHEN
            const findPromise = SUT.findAll(needle, {
                searchRegion: region,
            });
            // THEN
            await expect(findPromise).rejects.toThrowError(`Searching for ${id} failed. Reason:`);
        });
    });
    it("should return region to highlight for chaining", async () => {
        // GIVEN
        const highlightRegion = new region_class_1.Region(10, 20, 30, 40);
        const highlightMock = jest.fn((value) => Promise.resolve(value));
        providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
            highlightScreenRegion: highlightMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
        // WHEN
        const result = await SUT.highlight(highlightRegion);
        // THEN
        expect(result).toEqual(highlightRegion);
    });
    it("should handle Promises and return region to highlight for chaining", async () => {
        // GIVEN
        const highlightRegion = new region_class_1.Region(10, 20, 30, 40);
        const highlightRegionPromise = new Promise((res) => res(highlightRegion));
        const highlightMock = jest.fn((value) => Promise.resolve(value));
        providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
            highlightScreenRegion: highlightMock,
        }));
        providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
        const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
        // WHEN
        const result = await SUT.highlight(highlightRegionPromise);
        // THEN
        expect(result).toEqual(highlightRegion);
    });
    describe("capture", () => {
        it("should capture the whole screen and save image", async () => {
            // GIVEN
            const screenshot = new image_class_1.Image(100, 100, Buffer.from([]), 4, "test", 4, 100 * 4);
            const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
            const saveImageMock = jest.fn();
            providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
                grabScreen: grabScreenMock,
            }));
            providerRegistryMock.getImageWriter = jest.fn(() => (0, sneer_1.mockPartial)({
                store: saveImageMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const imageName = "foobar.png";
            const expectedImagePath = (0, path_1.join)((0, process_1.cwd)(), imageName);
            const expectedData = {
                image: screenshot,
                path: expectedImagePath,
            };
            // WHEN
            const imagePath = await SUT.capture(imageName);
            // THEN
            expect(imagePath).toBe(expectedImagePath);
            expect(grabScreenMock).toHaveBeenCalled();
            expect(saveImageMock).toHaveBeenCalledWith(expectedData);
        });
        it("should throw in non-image input", async () => {
            // GIVEN
            const screenshot = (0, sneer_1.mockPartial)({ data: Buffer.from([]) });
            const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
            providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
                grabScreen: grabScreenMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const imageName = "foobar.png";
            // WHEN
            const result = SUT.capture(imageName);
            // THEN
            expect(result).rejects.toThrowError(/^capture requires an Image, but received/);
        });
    });
    describe("captureRegion", () => {
        it("should capture the specified region of the screen and save image", async () => {
            // GIVEN
            const screenshot = new image_class_1.Image(100, 100, Buffer.from([]), 4, "test", 4, 100 * 4);
            const regionToCapture = (0, sneer_1.mockPartial)({
                top: 42,
                left: 9,
                height: 10,
                width: 3.14159265359,
            });
            const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
            const saveImageMock = jest.fn();
            providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
                grabScreenRegion: grabScreenMock,
            }));
            providerRegistryMock.getImageWriter = jest.fn(() => (0, sneer_1.mockPartial)({
                store: saveImageMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const imageName = "foobar.png";
            const expectedImagePath = (0, path_1.join)((0, process_1.cwd)(), imageName);
            const expectedData = {
                image: screenshot,
                path: expectedImagePath,
            };
            // WHEN
            const imagePath = await SUT.captureRegion(imageName, regionToCapture);
            // THEN
            expect(imagePath).toBe(expectedImagePath);
            expect(grabScreenMock).toHaveBeenCalledWith(regionToCapture);
            expect(saveImageMock).toHaveBeenCalledWith(expectedData);
        });
        it("should throw in non-image input", async () => {
            // GIVEN
            const screenshot = (0, sneer_1.mockPartial)({ data: Buffer.from([]) });
            const regionToCapture = (0, sneer_1.mockPartial)({
                top: 42,
                left: 9,
                height: 10,
                width: 3.14159265359,
            });
            const grabScreenMock = jest.fn(() => Promise.resolve(screenshot));
            providerRegistryMock.getScreen = jest.fn(() => (0, sneer_1.mockPartial)({
                grabScreenRegion: grabScreenMock,
            }));
            providerRegistryMock.getLogProvider = () => new noop_log_provider_class_1.NoopLogProvider();
            const SUT = new screen_class_1.ScreenClass(providerRegistryMock);
            const imageName = "foobar.png";
            // WHEN
            const result = SUT.captureRegion(imageName, regionToCapture);
            // THEN
            expect(result).rejects.toThrowError(/^captureRegion requires an Image, but received/);
        });
    });
});
//# sourceMappingURL=screen.class.spec.js.map