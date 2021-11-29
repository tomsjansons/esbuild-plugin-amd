import { Plugin } from "esbuild";
declare type PluginOptions = {
    filter?: RegExp;
    debug?: boolean;
};
export declare function amd(options?: PluginOptions): Plugin;
export {};
