## The common Test Strater

This repo contains example tests that can be used as a starting point when writing automation tests

### Prerequisites

The following are required before you start testing:

- node v24.15.0 or latest
- npm 11.12.1 or latest
- android studio with ANDROID_HOME pointing to sdk
- xcode & xcode cli configured
- devices are connected and detectable

### Running Tests

clone the project
Navigate to the 'automation' directory within this repo.
update/create .env.dev and .env.prp files and update them

#### Build the project

```bash
npm install
```

This will install WDIO specifications with appium along with all other dependencies and appium driver will be installed as part of npm script:

```bash
 postinstall
```

#### To Run selection of tests on different platforms

Go to > package.json > scripts
Eg: Running Android tests on dev ENV
note: allure reporting is integrated

```bash
npm run test:android:dev
```

run the android specific test in prp use the following script:

```bash
npm run test:android:prp
```

## What does this automation framework provides ?

it provides the following features:

- ENV handling
- Platform handling
- Folder structure for screenobject classes, utility classes, spec/test files
- allure reporting with screenshots
- scripts to easyily integrate with pipelines

## Clarity of strategy

- Used WDIO to solve this as WDIO is cross platform and support testing of not only flutter based apps but react native apps, hybrid apps and can also be used for Web-Automation.
- It used appium under the hood which makes it flexible to test any platform and app type but it takes away the heavy boiler plate configuration and hance very easy to configure , build and scale.
- It supports TypeScript so can easily sit within dev repo and thus supports 'shift left'. Tester can directly use contracts (interfaces) or constants (in some occasions) and use in test scripts.
- Interally supports parallelism and very easy to integrate with BrowserStack or cloud service as it inheritly provide these services. We can directly use it in wdio.conf file
- Easy to scale
- prioritization model ensures we deliver a stable CI smoke suite covering all the key features like app home page, login with the pin and account details

## Testability approach

- Used stable parallel independent locators to make test less flaky
  added following locators in main.dart:
  - key: const Key('pin_input_field'),
  - key: const Key('login_submit_button'),
  - key: const Key('accounts_screen_root'),
  - key: Key('account*row*${acct['id']}'),
  - key: Key('account*balance*${acct['id']}'),
- Used DRY principle and created a single screenfile to handle both Android and iOS locators. Kept folder structures very simple so it's easy to maintain, scalable and robust in nature.
- we can jump on to the target page directly without following the manual onboarding wizard. This targets the right page on every execution
- Added specific capablities to turn off window animations this will stop the flakyness 20-30%

## Automation structure

Follow a clean folder structuring, this can be asily extended. It makes it easy to maintain and understand hence less onboarding time for new team members

## Robustness of the smoke flow

- Created Robust tests and all control is driverd from config/constants. Thus easy to test and update if any locator change or need a complete new data.
- Flexiblity to run on different ENVs

## CI logic

created scripts for each stage. scripts can be directly used in CI/CD.

## Further improvements

- locator chaining: we can use locator chaining in reduce the scope of search window
- can further open capablities at run time or from pipeline job parameters to run device specific test
- create a browser_stack specific .env file and adding a switch to run local or on cloud
- can use cucumber(BDD) for a more business specific reporting/features

## CI/CD improvements

- can use github webhooks to run jenkins job on each merge/PR
- can use github actions at PR
- can use AWS for event based automation like lambdas to trigger jenkins build
- can further split job(based on the availablity of jenkins agents) per feature wise to fasttrack the execution
