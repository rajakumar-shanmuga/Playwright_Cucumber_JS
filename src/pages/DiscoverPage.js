const { expect } = require('@playwright/test')
class DiscoverPage {
 

    constructor(page,logger) {
        this.page = page
        this.logger = logger;
        this.creditCards = this.page.locator('.carousel__track li');
        this.cardsList = this.page.locator('.cmp-container:visible');
        this.cardDesign = this.page.getByLabel("American Flag");
        this.cardDesignImg = this.page.locator('#apply-minutes-col-small img');
        this.noCreditScoreRequired = this.page.locator('#no-credit-score-required-disclosure-mobile b');
    }

    async navigateTo() {
        await this.creditCards.first().click()
    }

    async applyDesiredCreditCard(){
        await this.cardsList.last().waitFor();
        const count = await this.cardsList.count();
        this.logger.info('number of credit card types appear on the page: '+count);
        for (let i = 0; i < count; i++) {
          const name = await this.cardsList.nth(i).locator('h2').textContent();
          if (name.includes('Student Cash Back')) {
            this.logger.info('desired credit card name: '+name);
            await this.cardsList.nth(i).locator('[data-analytics-label*=APPLY]').click();
            await this.page.reload();
            break;
          }
        }
    }
    async selectDesiredCreditCardDesign(){
        await this.cardDesign.click();
    }

    async verifyCardDesignSelected(){
        const cardDesign = await this.cardDesignImg.getAttribute('alt');
        this.logger.info('desired card dessign : ' + cardDesign);
        expect(cardDesign).toBe('American Flag');
    }

    async verifyCreditScoreNotRequired(){
        const sectionName = await this.noCreditScoreRequired.textContent();
        this.logger.info('desired card dessign : ' + sectionName);
        expect(sectionName).toEqual('No Credit Score Required:');
    }
}

module.exports = { DiscoverPage }