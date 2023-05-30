import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import alias from "@rollup/plugin-alias";
import path from "path";
import { fileURLToPath } from "url";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import css from "rollup-plugin-css-only";
import commonjs from "@rollup/plugin-commonjs";
import rollupNodeResolve from "rollup-plugin-node-resolve";
import rolllupJson from "rollup-plugin-json";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default [
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/index.es.js",
                format: "es",
                exports: "named",
                sourcemap: true,
            },
        ],
        external: ["react", "react-dom"],
        plugins: [
            babel({
                exclude: "node_modules/**",
                presets: ["@babel/preset-react"],
            }),
            external(),
            resolve(),
            terser(),
            commonjs(),
            rollupNodeResolve({
                jsnext: true,
                preferBuiltins: true,
                browser: true,
            }),
            rolllupJson(),
            postcss({
                minimize: true,
                //modules: true, // <--- this line

                extract: true,
                extensions: [".css", ".module.css"],
                plugins: [tailwindcss(tailwindConfig)],
            }),
            css(),
            alias({
                resolve: [".js", ".ts", ".svelte"],
                entries: {
                    "@assets": path.resolve(__dirname, "./src/assets"),
                    "@context": path.resolve(__dirname, "./src/context"),
                },
            }),
            image(),
            typescript(),
        ],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
        external: [/\.css$/u],
    },
];
