import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to inject CSS into JS
function cssInjectorPlugin(): Plugin {
    return {
        name: "css-injector",
        apply: "build",
        enforce: "post",
        generateBundle(_, bundle) {
            let cssContent = "";
            const cssFiles: string[] = [];

            // Collect all CSS
            for (const fileName in bundle) {
                const chunk = bundle[fileName];
                if (chunk.type === "asset" && fileName.endsWith(".css")) {
                    cssContent += chunk.source;
                    cssFiles.push(fileName);
                }
            }

            if (cssContent) {
                // Find the JS entry file
                for (const fileName in bundle) {
                    const chunk = bundle[fileName];
                    if (chunk.type === "chunk" && chunk.isEntry) {
                        // Escape CSS for injection
                        const escapedCss = cssContent
                            .replace(/\\/g, "\\\\")
                            .replace(/'/g, "\\'")
                            .replace(/\n/g, "")
                            .replace(/\r/g, "");

                        // Inject CSS loader at the start of the JS
                        const cssInjector = `
(function(){
  var style = document.createElement('style');
  style.textContent = '${escapedCss}';
  document.head.appendChild(style);
})();
`;
                        chunk.code = cssInjector + chunk.code;
                    }
                }

                // Remove separate CSS files
                for (const cssFile of cssFiles) {
                    delete bundle[cssFile];
                }
            }
        },
    };
}

// Vite config for building the embeddable widget
export default defineConfig({
    plugins: [react(), cssInjectorPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client", "src"),
            "@shared": path.resolve(__dirname, "shared"),
        },
    },
    css: {
        postcss: "./postcss.config.js",
    },
    build: {
        outDir: "dist/widget",
        emptyOutDir: true,
        lib: {
            entry: path.resolve(__dirname, "client", "src", "widget-entry.tsx"),
            name: "RitmosWidget",
            fileName: () => "widget.js",
            formats: ["iife"],
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
        minify: "esbuild",
        sourcemap: false,
        cssCodeSplit: false,
    },
    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
    },
});
