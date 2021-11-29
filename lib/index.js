"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amd = void 0;
const amd_to_es6_1 = __importDefault(require("@buxlabs/amd-to-es6"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function amd(options) {
    const { filter, debug } = options || {};
    if (!filter) {
        console.warn("No filter specified - execution will be very slow as every file will need to be checked");
    }
    return {
        name: "amd",
        setup(build) {
            build.onResolve({ filter: filter || /.*/ }, (args) => {
                return {
                    path: path_1.default.resolve(args.resolveDir, args.path),
                    namespace: "amd",
                };
            });
            build.onLoad({ filter: /.*/, namespace: "amd" }, (args) => {
                const fileContents = fs_1.default.readFileSync(args.path, "utf-8");
                const transformedContents = (0, amd_to_es6_1.default)(fileContents);
                if (debug && transformedContents !== fileContents) {
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