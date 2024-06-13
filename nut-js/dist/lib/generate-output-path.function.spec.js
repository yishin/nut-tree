"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const file_type_enum_1 = require("./file-type.enum");
const generate_output_path_function_1 = require("./generate-output-path.function");
describe("generate-output-path", () => {
    it("should default to a PNG file without pre- or postfix in the current directory", () => {
        // GIVEN
        const filename = "asdf";
        const ext = file_type_enum_1.FileType.PNG;
        const expectedPath = (0, path_1.join)((0, process_1.cwd)(), `${filename}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename);
        // THEN
        expect(result).toEqual(expectedPath);
    });
    it("should should allow to add a prefix to the filename", () => {
        // GIVEN
        const filename = "asdf";
        const pre = "foo_";
        const ext = file_type_enum_1.FileType.PNG;
        const expectedPath = (0, path_1.join)((0, process_1.cwd)(), `${pre}${filename}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename, { prefix: pre });
        // THEN
        expect(result).toEqual(expectedPath);
    });
    it("should should allow to add a postfix to the filename", () => {
        // GIVEN
        const filename = "asdf";
        const post = "_bar";
        const ext = file_type_enum_1.FileType.PNG;
        const expectedPath = (0, path_1.join)((0, process_1.cwd)(), `${filename}${post}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename, { postfix: post });
        // THEN
        expect(result).toEqual(expectedPath);
    });
    it("should should allow to add both a prefix and a postfix to the filename", () => {
        // GIVEN
        const filename = "asdf";
        const pre = "foo_";
        const post = "_bar";
        const ext = file_type_enum_1.FileType.PNG;
        const expectedPath = (0, path_1.join)((0, process_1.cwd)(), `${pre}${filename}${post}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename, {
            postfix: post,
            prefix: pre,
        });
        // THEN
        expect(result).toEqual(expectedPath);
    });
    it("should should allow to configure the file path", () => {
        // GIVEN
        const filename = "asdf";
        const filepath = "/foo/test/bar";
        const ext = file_type_enum_1.FileType.PNG;
        const expectedPath = (0, path_1.join)(filepath, `${filename}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename, {
            path: filepath,
        });
        // THEN
        expect(result).toEqual(expectedPath);
    });
    it("should handle relative file path", () => {
        // GIVEN
        const filename = "asdf";
        const filepath = "/foo/../bar";
        const ext = file_type_enum_1.FileType.PNG;
        const expectedPath = (0, path_1.join)(filepath, `${filename}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename, {
            path: filepath,
        });
        // THEN
        expect(result).toEqual(expectedPath);
    });
    it("should handle different file types", () => {
        // GIVEN
        const filename = "asdf";
        const ext = file_type_enum_1.FileType.JPG;
        const expectedPath = (0, path_1.join)((0, process_1.cwd)(), `${filename}${ext}`);
        // WHEN
        const result = (0, generate_output_path_function_1.generateOutputPath)(filename, {
            type: file_type_enum_1.FileType.JPG,
        });
        // THEN
        expect(result).toEqual(expectedPath);
    });
});
//# sourceMappingURL=generate-output-path.function.spec.js.map