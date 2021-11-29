import { Plugin } from "esbuild";
declare type PluginOptions = {
    filter: RegExp;
};
export declare function amd({ filter }: PluginOptions): Plugin;
export {};
