import { Plugin } from "esbuild";
import convert from "@buxlabs/amd-to-es6";
import path from "path";
import fs from "fs";

type PluginOptions = {
  filter: RegExp;
};

export function amd({ filter }: PluginOptions): Plugin {
  return {
    name: "amd",
    setup(build) {
      build.onResolve({ filter }, (args) => {
        return {
          path: path.resolve(args.resolveDir, args.path),
          namespace: "amd",
        };
      });
      build.onLoad({ filter: /.*/, namespace: "amd" }, (args) => {
        const result = fs.readFileSync(args.path, "utf-8");
        const transformed = convert(result);
        return {
          contents: transformed,
          loader: "js",
        };
      });
    },
  };
}
