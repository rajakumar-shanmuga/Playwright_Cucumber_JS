const { Given, setDefaultTimeout } = require('@cucumber/cucumber');
const { fixture } = require('../../../fixtures/fixture');
setDefaultTimeout(60 * 1000 * 2);

Given('navigate to {string} application', async function (appl) {
    const url = eval(`process.env.${appl}URL`);
    await launchApplication(url);
});

async function launchApplication(url) {
    await fixture.page.goto(url, {
        waitUntil: "domcontentloaded"
    });
    fixture.logger.info('application is launched with url: ' + url);
}