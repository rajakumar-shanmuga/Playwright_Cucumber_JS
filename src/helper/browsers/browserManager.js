const playwright = require('@playwright/test');
const { browserOptions } = require('./browserOptions');

const invokeBrowser = async () => {

    const browserType = browserOptions.channel.toLowerCase();
    switch (browserType) {

        case "chrome":
            return await playwright['chromium'].launch(browserOptions);
        case "firefox":
            delete browserOptions['channel'];
            return await playwright['firefox'].launch(browserOptions);
        case "safari":
            delete browserOptions['channel'];
            return await playwright['webkit'].launch(browserOptions);
        case "msedge":
            return await playwright['chromium'].launch(browserOptions);
        default:
            throw new Error('please pass proper browser type');

    }
}

module.exports = { invokeBrowser };