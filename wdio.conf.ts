import { getCapabilities, getServices } from './test/utils/envConfigs';
import { Options } from '@wdio/types/';

export const config: Options.Testrunner = {
	autoCompileOpts: {
		autoCompile: true,
		tsNodeOpts: {
			transpileOnly: true,
			project: "./tsconfig.json",
		},
	},
	port: 4723,

	specs: ["./test/specs/**/*.ts"],

	maxInstances: 1,

	capabilities: getCapabilities(),

	services: getServices(),

	// Level of logging verbosity: trace | debug | info | warn | error | silent
	logLevel: "trace",

	baseUrl: "http://localhost/",

	waitforTimeout: 10000,

	connectionRetryTimeout: 120000,

	connectionRetryCount: 3,

	framework: "mocha",

	reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
	// reporters: ["spec"],

	mochaOpts: {
		ui: "bdd",
		timeout: 60000,
	},
}