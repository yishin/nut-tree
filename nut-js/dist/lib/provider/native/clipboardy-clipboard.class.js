"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboardy_1 = __importDefault(require("clipboardy"));
class default_1 {
    constructor() { }
    async hasText() {
        return new Promise((resolve, reject) => {
            try {
                const content = clipboardy_1.default.readSync();
                resolve(content.length > 0);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    clear() {
        return Promise.reject("Method not implemented.");
    }
    async copy(text) {
        return new Promise((resolve, reject) => {
            try {
                clipboardy_1.default.writeSync(text);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async paste() {
        return clipboardy_1.default.read();
    }
}
exports.default = default_1;
//# sourceMappingURL=clipboardy-clipboard.class.js.map