const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const AppOptions = require("./lib").loadOptions();

const DEV = process.env.NODE_ENV === "development";

const getExternals = () => {
	let dev = [
		"uws",
		NodeExternals({
			whitelist: ["webpack/hot/signal"]
		})
	];
	let pro = ["uws"];
	if (!AppOptions.buildNodeModules) {
		pro.push(
			NodeExternals({
				whitelist: ["webpack/hot/signal"]
			})
		);
	}
	return DEV ? dev : pro;
};
module.exports = {
	target: "node",
	mode: DEV ? "development" : "production",
	entry: [AppOptions.appIndex],
	output: {
		path: AppOptions.appBuild,
		filename: "index.js"
	},
	devtool: DEV ? "eval-source-map" : AppOptions.sourceMap ? "source-map" : AppOptions.sourceMap,
	node: {
		__filename: false,
		__dirname: false
	},
	optimization: {
		minimize: !DEV
	},
	resolve: {
		extensions: [".ts", ".js", ".mjs", ".node"],
		alias: {
			"~": AppOptions.rootPath
		}
	},
	externals: getExternals(),
	module: {
		rules: [
			{
				test: /\.(js|mjs|ts)$/,
				use: {
					loader: require.resolve("ts-loader"),
					options: {
						transpileOnly: true,
						configFile: AppOptions.tsConfigFile
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ProgressBarPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		AppOptions.nodemon &&
			new NodemonPlugin({
				ignore: ["*.js.map"],
				nodeArgs: ["--inspect"],
				verbose: true
			})
	].filter(d => d)
};
