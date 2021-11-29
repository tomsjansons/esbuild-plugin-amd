import { Plugin } from "esbuild";
declare type PluginOptions = {
    debug?: boolean;
};
export declare function amd(options?: PluginOptions): Plugin;
export {};
