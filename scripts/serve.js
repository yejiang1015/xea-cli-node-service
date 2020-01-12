const webpack = require("webpack");
const lib = require("../lib");
const options = lib.loadOptions();
module.exports = async () => {
	process.env.NODE_ENV = "development";
	return new Promise((resolve, reject) => {
		webpack(require("../webpack.config")).watch(
			{
				ignored: /(node_modules|package\.json)$/,
				aggregateTimeout: 300,
				poll: 600
			},
			(err, stats) => {
				if (err) return reject(err);

				if (!options.nodemon) {
					const statsString = stats.toString({
						colors: true,
						all: false,
						warnings: false
					});
					lib.clearConsole();
					lib.echoString(statsString, stats, "serve");
					return resolve();
				}
				const statsString = stats.toString({
					colors: true,
					all: false,
					warnings: false,
					hash: false,
					errors: true,
					timings: false,
					builtAt: false,
					chunks: false
				});
				console.info(statsString);
				resolve();
			}
		);
	});
};
