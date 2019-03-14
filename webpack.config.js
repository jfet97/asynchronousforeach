const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        library: "asynchronousforeach",
        // libraryExport: 'default',
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "dist"),
    }
};