const path = require("path");

exports.XeaCliNodeService = ({ rootPath }) => {
	return {
		/** tsconfig.json 文件目录 */
		tsConfigFile: path.join(rootPath, "tsconfig.json"),
		/** 工作目录 */
		appSrc: path.join(rootPath, "src"),
		/** 入口文件 */
		appIndex: path.join(rootPath, "src/index.ts"),
		/** 打包输出到目录 */
		appBuild: path.join(rootPath, "dist"),
		/** 是否把 node_modules 内的文件一起打包 */
		buildNodeModules: false,
		/** 生产环境是否启用 sourceMap */
		sourceMap: true,
		/** 开发环境是否使用 nodemon 自动启动服务 */
		nodemon: false
	};
};
