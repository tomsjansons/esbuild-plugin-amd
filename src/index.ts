import { Plugin } from "esbuild";
import convert from "@buxlabs/amd-to-es6";
import fs from "fs";

type PluginOptions = {
  debug?: boolean;
};

export function amd(options?: PluginOptions): Plugin {
  const { debug } = options || {};
  return {
    name: "amd",
    setup(build) {
      build.onLoad({ filter: /$^/ }, async (args) => {
        const fileContents = await fs.promises.readFile(args.path, "utf-8");

        if (fileContents.indexOf("define") === -1) {
          return null;
        }

        const transformedContents = convert(fileContents);
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
