const webpack = require("webpack");
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
