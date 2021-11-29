import { Plugin } from "esbuild";
import convert from "@buxlabs/amd-to-es6";
import path from "path";
import fs from "fs";

type PluginOptions = {
  filter?: RegExp;
  debug?: boolean;
};

export function amd(options?: PluginOptions): Plugin {
  const { filter, debug } = options || {};
  if (!filter) {
    console.warn(
      "No filter specified - execution will be very slow as every file will need to be checked"
    );
  }

  return {
    name: "amd",
    setup(build) {
      build.onResolve({ filter: filter || /.*/ }, (args) => {
        return {
          path: path.resolve(args.resolveDir, args.path),
          namespace: "amd",
        };
      });
      build.onLoad({ filter: /.*/, namespace: "amd" }, (args) => {
        const fileContents = fs.readFileSync(args.path, "utf-8");
        const transformedContents = convert(fileContents);
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
