import { join } from "node:path";
import { config as baseConfig } from "./wdio.shared.local.appium.conf.js";
import path from "path";
import url from "node:url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const { mochaOpts, ...cleanBaseConfig } = baseConfig;

export const config: WebdriverIO.Config = {
    ...cleanBaseConfig,

    // ============
    // Specs
    // ============
    specs: ["../tests/features/**/google.search.feature"],
    // ============
    // Framework
    // ============
    // By default we use the Mocha framework, see the `wdio.shared.conf.ts` which is imported by `./wdio.shared.local.appium.conf.js`. For Cucumber we need to "redefine" the framework
    framework: "cucumber",
    //
    // You also need to specify where your step definitions are located.
    // See also: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [
            path.join(
                __dirname,
                "..",
                "tests",
                "steps",
                "access_google_search_key_steps.ts"
            ),
        ], // <string[]> (file/dir) require files before executing features
        backtrace: false, // <boolean> show full backtrace for errors
        compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source URIs
        strict: false, // <boolean> fail if there are any undefined or pending steps
        timeout: 60000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        scenarioLevelReporter: false, // Enable this to make webdriver.io behave as if scenarios and not steps were the tests.
    },
    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
    capabilities: [
        {
            // The defaults you need to have in your config
            platformName: "Android",
            browserName: "chrome",
            "wdio:maxInstances": 1,
            // For W3C the appium capabilities need to have an extension prefix
            // http://appium.io/docs/en/writing-running-appium/caps/
            // This is `appium:` for all Appium Capabilities which can be found here

            //
            // NOTE: Change this name according to the Emulator you have created on your local machine
            "appium:deviceName": "Pixel_2_API_34",
            //
            // NOTE: Change this version according to the Emulator you have created on your local machine
            "appium:platformVersion": "14.0",
            "appium:automationName": "UiAutomator2",
            "appium:orientation": "PORTRAIT",
//             "appium:app": join(
//                             process.cwd(),
//                             "apps",
//                             //
//                             // NOTE: Change this name according to the app version you downloaded
//                             "Google Chrome_131.0.6778.135_APKPure.apk"
//                         ),
//             "appium:appWaitActivity": "com.google.android.apps.chrome.Main",
            "appium:newCommandTimeout": 0,
            "wdio:enforceWebDriverClassic": true,
        },
    ],
};
