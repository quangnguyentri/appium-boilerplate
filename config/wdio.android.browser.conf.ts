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
    specs: ["../tests/specs/**/browser.google.search.spec.ts"],
    // ============
    // Framework
    // ============
    // By default we use the Mocha framework, see the `wdio.shared.conf.ts` which is imported by `./wdio.shared.local.appium.conf.js`. For Cucumber we need to "redefine" the framework
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
