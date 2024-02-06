const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { fixture } = require('../../../fixtures/fixture');
const { POManager } = require('../../../helper/utils/poManager');
let poManager;
setDefaultTimeout(60 * 1000 * 2);

When('search product name with {string}', async function (searchKeyword) {
    poManager = new POManager(fixture.page, fixture.logger);
    await poManager.getAmazonPage().searchWithKeyword(searchKeyword);

});

When('select desired {string}', async function (item) {
    await poManager.getAmazonPage().selectDesiredItem(item);
});

When('select item desired color {string}', async function (color) {
    await poManager.getAmazonPage().selectItemColor(color)
});

When('add to cart', async function () {
    await poManager.getAmazonPage().addItemToCart();
});

When('navigate to cart', async function () {
    await poManager.getAmazonPage().gotoCart();
});

Then('verify selected item is present on the cart', async function () {
    await poManager.getAmazonPage().verifyItemPresentOnCart();
});

Then('item added successfully', async function () {
    await poManager.getAmazonPage().verifyItemAddedSuccessfully();
});

When('with no protection', async function () {
    await poManager.getAmazonPage().selectNoProtection()
});