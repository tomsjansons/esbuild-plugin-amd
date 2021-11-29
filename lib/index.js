"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amd = void 0;
const amd_to_es6_1 = __importDefault(require("@buxlabs/amd-to-es6"));
const fs_1 = __importDefault(require("fs"));
function amd(options) {
    const { debug } = options || {};
    return {
        name: "amd",
        setup(build) {
            build.onLoad({ filter: /$^/ }, async (args) => {
                const fileContents = await fs_1.default.promises.readFile(args.path, "utf-8");
                if (fileContents.indexOf("define") === -1) {
                    return null;
                }
                const transformedContents = (0, amd_to_es6_1.default)(fileContents);
                if (transformedContents === fileContents) {
                    return null;
                }
                if (debug) {
                    console.info("AMD: Transformed file", args.path);
                }
                return {
                    contents: transformedContents,
                    loader: "js",
                };
            });
        },
    };
}
exports.amd = amd;
//# sourceMappingURL=index.js.map