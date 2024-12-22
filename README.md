# Appium Boilerplate

**NOTE:** This boilerplate is for Webdriver V8 where the tests are written with `async`/`await` and TypeScript. If you need a boilerplate for older versions, check the following:

- V7 (JavaScript) please click [here](https://github.com/webdriverio/appium-boilerplate/tree/v7)
- V7 (TypeScript, sync mode) please click [here](https://github.com/webdriverio/appium-boilerplate/tree/sync-mode)

Boilerplate project to run Appium tests together with WebdriverIO for:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome and iOS Safari browser ([check here](./README.md#automating-chrome-or-safari))

> [!IMPORTANT]
> This boilerplate uses the WebdriverIO native demo app which can be found [here](https://github.com/webdriverio/native-demo-app).

> [!NOTE]
> This boilerplate only handles local execution on 1 em/simulator at a time, not parallel execution. For more info about that Google on setting up a grid with Appium.

## Based on

This boilerplate is currently based on:

- **WebdriverIO:** `8.x`
- **Appium:** `2.x`

## To install chrome app as mentioned in email

Download that apk and create new folder "apps" in root of repository and put it there.
Then uncomment appium:app, and appium:appWaitActivity in config/wdio.android.browser.conf.ts and config/wdio.android.browser.cucumber.conf.ts.
Increase appium:newCommandTimeout to 240 to make sure it's successfully install Chrome app in 240s

## Installation

1. Clone this project by running

```sh
git clone https://github.com/quangnguyentri/appium-boilerplate.git
```

2. Install all dependencies

```sh
npm install
```

> [!TIP]
> Use the [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) package to setup Appium on your local machine. This will also help you configure Android Emulators/ iOS Simulators.

> [!NOTE]
> You don't need Appium installed on you local machine When running test in a cloud

3. Create a `./apps` directory at the root of this project. Download the app files (`.zip` / `.apk`) with version >= `1.0.0`, which can be found [here](https://github.com/webdriverio/native-demo-app/releases), into the `./apps` folder.

4. Adjust the configuration file(s) for [Android](./config/wdio.android.app.conf.ts) and [iOS](./config/wdio.ios.app.conf.ts) regarding the device configuration you've created on your local machine.

5. Running tests locally
    - **Android Browser:**  `npm run android.browser`
	- **Android Browser Cucumber:**  `npm run android.browser.cucumber`

6. To run with Chrome download apk as mentioned in email. Please download apk and create folder "apps" in root of repository folder and put it there.
Then modify config files: "wdio.android.browser.conf.ts" and "wdio.android.browser.cucumber.conf.ts" to uncomment "appium:app", and "appium:appWaitActivity"
and increase "appium:newCommandTimeout": 0 to make sure it successfully wait for finish installing Chrome apk application.

## How to implement in your project

Choose one of the following options:

1. Clone the git repo — `git clone https://github.com/webdriverio/appium-boilerplate.git`
1. Copy the files to your project directory (all files in `/tests` and the `wdio.conf` files in the `config` folder)
1. Merge project dev dependencies with your project dev dependencies in your `package.json`
1. Merge the scripts to your `package.json` scripts
1. Run the tests, see [Native App Tests](#native-app-tests) or [Automating Chrome of Safari](#automating-chrome-or-safari).

## Configuration files

This boilerplate uses a specific config for iOS and Android, see [configs](./config). The configs are based on a shared config
[`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts).
This shared config holds **all the defaults** so the iOS and Android configs only need to hold the capabilities and specs that are needed for running on iOS and or Android (app or browser).

Please check the [`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts)-file for the minimal configuration options. Notes are added for why a different value has been selected in comparison to the default values WebdriverIO provides.

Since we do not have Appium installed as part of this package we are going to use the globally installed version of Appium. This is configured in [`wdio.shared.local.appium.conf.ts`](./config/wdio.shared.local.appium.conf.ts).

## Locator strategy for native apps

The locator strategy for this boilerplate is to use `accessibilityID`s, see also the
[WebdriverIO docs](https://webdriver.io/docs/selectors#accessibility-id) or this newsletter on [AppiumPro](https://appiumpro.com/editions/20).
`accessibilityID`s makes it easy to script once and run on iOS and Android because most of the apps already have some `accessibilityID`s.

If `accessibilityID`'s can't be used, and for example only XPATH is available, then the following setup could be used to make cross-platform selectors

```js
const SELECTORS = {
    WEB_VIEW_SCREEN: browser.isAndroid
        ? '*//android.webkit.WebView'
        : '*//XCUIElementTypeWebView',
};
```

> [!NOTE]
> If you look into the screen/page-objects you might see that a lot of selectors are made private, meaning you can't use the elements in the spec-file itself. This has been done on purpose because one of the *best practices* is to remove all interactions from your spec files and implement the interactions in the page objects. This will make it easier to maintain for the future and easier to refactor if new interaction methods will be added or names will be adjusted.

## Cloud vendors

### Sauce Labs

If you want to run the Native App tests on Sauce Labs you need to do 2 things:

- Add the [Sauce Service](#add-sauce-service) to your project
- Upload the apps to the [Sauce Labs Storage](#upload-apps-to-sauce-storage)

When the above has been executed you can follow the steps:

- [Run app tests on the Sauce Labs Real Device Cloud](#run-app-tests-on-the-sauce-labs-real-device-cloud)
- [Run app tests on the Sauce Labs Emulators and Simulators](#run-app-tests-on-the-sauce-labs-emulators-and-simulators)

#### Add Sauce Service

Make sure you install the latest version of the `@wdio/sauce-service` with

```shell
npm install --save-dev @wdio/sauce-service
```

and add `services: ['sauce'],` to the config. If no `region` is provided it will automatically default to the US-Virtual/RDC cloud.
If you provide `region: 'us'` or `region: 'eu'` it will connect to the US or the EU Virtual/RDC cloud.

#### Upload apps to Sauce Storage

If you want to use Android emulators, iOS simulators or Android real devices in the Sauce Labs UI you need to upload the apps to the Sauce Storage. You can find a script to upload them to, and the US, and EU DC in [this](./scripts) folder. You can push the files to the storage by executing the following steps in a terminal from the root of this project:

```sh
cd scripts
./push_apps_to_sauce_storage.sh
```

When you've done that you will see a lot of successful logs in your terminal.

#### Run app tests on the Sauce Labs Real Device Cloud

> ![NOTE]
> Due to the lack of signing iOS apps, this boilerplate doesn't support Real Devices.  Only Android Real Devices are supported. If you want to use iOS Real Devices then you need to provide your own app that has been signed properly.

Please check the [Android Real Devices](./config/wdio.android.app.conf.ts)-config to see the setup for Android real devices.

You can use the following scripts, see the [`package.json`](./package.json), to execute the tests in the cloud:

```sh
# For Android Real Devices
# On EU DC
npm run android.sauce.rdc.app.eu
# On US DC
npm run android.sauce.rdc.app.us
```

#### Run app tests on the Sauce Labs Emulators and Simulators

Please check the following configs to verify the configurations:

- [Android Emulators](./config/saucelabs/wdio.android.emulators.app.conf.ts)
- [iOS Simulators](./config/saucelabs/wdio.ios.simulators.app.conf.ts)

The following scripts can be used, see the [`package.json`](./package.json), to execute the tests in the cloud:

```sh
# For Android Emulators
# On EU DC
npm run android.sauce.emulators.app.eu
# On US DC
npm run android.sauce.emulators.app.us
# For Android Real Devices
# On EU DC
npm run android.sauce.rdc.app.eu
# On US DC
npm run android.sauce.rdc.app.us

# For iOS
# On EU DC
npm run ios.sauce.simulator.app.eu
# On US DC
npm run ios.sauce.simulator.app.us
```

### BrowserStack

This boilerplate provides a setup for testing with BrowserStack. Please check the [BrowserStack](./config/browserstack) folder to see the setup for iOS and Android.

Make sure you install the latest version of the `@wdio/browserstack-service` with:

```shell
npm install --save-dev @wdio/browserstack-service
```

There are 2 scripts that can be used. See the [`package.json`](./package.json) to execute the tests in the cloud:

```sh
# For iOS
$ npm run ios.browserstack.app

# For Android
$ npm run android.browserstack.app
```


## FAQ

See [FAQ](./docs/FAQ.md)

## Tips and Tricks

See [Tips and Tricks](./docs/TIPS_TRICKS.md)
