const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { fixture } = require('../../../fixtures/fixture');
const { POManager } = require('../../../helper/utils/poManager');
let poManager;
setDefaultTimeout(60 * 1000 * 2);

When('navigate to credit cards', async function () {
  poManager = new POManager(fixture.page, fixture.logger);
  await poManager.getDiscoverPage().navigateTo();
});

When('apply student cash back credit card', async function () {
  await poManager.getDiscoverPage().applyDesiredCreditCard();

});

When('select american flag card design', async function () {
  await poManager.getDiscoverPage().selectDesiredCreditCardDesign();
});

Then('verify card design is selected correctly', async function () {
  await poManager.getDiscoverPage().verifyCardDesignSelected();
});

Then('no credit score required section is present', async function () {
  await poManager.getDiscoverPage().verifyCreditScoreNotRequired();
});