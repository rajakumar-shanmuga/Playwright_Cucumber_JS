const { Before, After, BeforeAll, AfterAll, Status, AfterStep } = require("@cucumber/cucumber");
const { invokeBrowser } = require("../helper/browsers/browserManager");
const { getEnv } = require('../helper/env/env');
const { createLogger } = require("winston");
const { options } = require("../helper/utils/logger");
const { fixture } = require('../fixtures/fixture');
const fs = require('fs-extra');


let page;
let browser;
let context;

BeforeAll(async function () {
    await getEnv();
    browser = await invokeBrowser();
});
Before({ tags: "not @auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    //context = await browser.newContext(); for no video
    context = await browser.newContext({
        recordVideo: {
            dir: 'test-results/videos'
        },
    });

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true

    });

    page = await context.newPage();
    fixture.page = page
    fixture.logger = createLogger(options(scenarioName));

});

Before({ tags: "@auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    //context = await browser.newContext(); for no video
    context = await browser.newContext({
        recordVideo: {
            dir: 'test-results/videos'
        },
        storageState: getStorageState(pickle.name) //based on the tag name
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true

    });
    page = await context.newPage();
    fixture.page = page
    fixture.logger = createLogger(options(scenarioName));

});

After(async function ({ pickle, result }) {

    let videoPath;
    let img;
    const path = `./test-results/trace/${pickle.id}.zip`;

    if (result.status === Status.FAILED) {
        img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.anem}.png`, type: 'png' });
        videoPath = await fixture.page.video().path();
    }

    await context.tracing.stop({ path: path })
    await fixture.page.close();
    await context.close();

    if (result.status === Status.FAILED) {
        this.attach(
            img, "image/png"
        );
        this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );

        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
        this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    }
});
AfterAll(async function () {
    await browser.close();
});

function getStorageState(name) {
    if (name.endsWith('card')) {
        return "src/helper/auth/login.json";
    } else if (name.endsWith('bank')) {
        return "src/helper/auth/bankLogin.json";
    }
}
