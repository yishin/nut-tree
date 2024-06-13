"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageToJimp_function_1 = require("./imageToJimp.function");
class default_1 {
    store(parameters) {
        return new Promise((resolve, reject) => {
            const jimpImage = (0, imageToJimp_function_1.imageToJimp)(parameters.image);
            jimpImage
                .writeAsync(parameters.path)
                .then((_) => resolve())
                .catch((err) => reject(err));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=jimp-image-writer.class.js.map