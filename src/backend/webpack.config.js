const path = require("path");

module.exports = {
    mode: "development",
    entry: "./app/index.ts",
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
}