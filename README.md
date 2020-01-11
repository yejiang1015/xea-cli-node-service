# xea-cli-node-service

# 安装

You can install xea-cli-node-service using npm:

```js
$ npm install xea-cli-node-service --save-dev
```

# 配置

可选择的配置、xea-cli-node-service 具有默认配置。可通过根目录添加配置文件 `xea.config.js` 来自定义覆盖默认配置。
注意：自定义配置都是覆盖字段的值

```js
const path = require("path");
exports.XeaCliNodeService = ({ rootPath, env }) => {
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


```

# tsconfig.json

```json

{
    "compileOnSave": false,
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "module": "esnext",
        "target": "es5",
        "lib": [
            "es6",
            "dom"
        ],
        "sourceMap": true,
        "allowJs": false,
        "rootDir": ".",
        "baseUrl": ".",
        "moduleResolution": "node",
        "traceResolution": true,
        "forceConsistentCasingInFileNames": true,
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": false,
        "strictNullChecks": true,
        "noUnusedLocals": true,
        "allowSyntheticDefaultImports": true,
        "outDir": "dist",
        "skipDefaultLibCheck": true,
        "declaration": true,
        "noUnusedParameters": false,
        "noFallthroughCasesInSwitch": true,
        "removeComments": true,
        "suppressImplicitAnyIndexErrors": true,
        "paths": {
            "~/*": [
                "./*"
            ],
        }
    },
    "awesomeTypescriptLoaderOptions": {
        //Typescript加载选项
        "forkChecker": true,
        "useWebpackText": true
    },
    "exclude": [
        "node_modules",
        "dist",
    ]
}

```

# 使用

-   package.json

```js
"scripts": {
    ...
    "start": "xea-cli-node-service serve",
    "build": "xea-cli-node-service build"
}

```
