const { expect } = require('@playwright/test');

class AmazonPage {
    constructor(page, logger) {
        this.page = page;
        this.logger = logger;
        this.seachBox = this.page.locator('#twotabsearchtextbox');
        this.searchResults = this.page.locator('.s-search-results [data-component-type=s-search-result]');
        this.phoneColors = this.page.locator('#variation_color_name [id*=color_name] img');
        this.addToCart = this.page.locator('#add-to-cart-button');
        this.cart = this.page.locator('#nav-cart-text-container');
        this.cartItemList = this.page.locator('.sc-list-item-content .a-truncate-cut');
        this.protectionNotReq = this.page.locator('[aria-labelledby=attachSiNoCoverage-announce]')
    }

    async searchWithKeyword(searchKeyword) {

        await this.seachBox.click();
        await this.seachBox.fill(searchKeyword, { delay: 10 });
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState();
        this.logger.info('search keyword: ' + searchKeyword);
    }

    async selectDesiredItem(item) {
        let data;
        const count = await this.searchResults.count();
        this.item = item;
        for (let i = 0; i < count; i++) {
            const desiredItem = await this.searchResults.locator('[data-cy=title-recipe]').nth(i);
            data = await desiredItem.textContent()
            if (data.includes(item)) {
                await desiredItem.locator('h2 a').click();
                await this.page.waitForLoadState();
                break;
            }

        }
        this.logger.info('selected item from search results: ' + data);
    }
    async selectItemColor(color) {
        let colorName;
        const count = await this.phoneColors.count();
        for (let i = 0; i < count; i++) {
            colorName = await this.phoneColors.nth(i).getAttribute('alt');
            if (colorName.includes(color)) {
                await this.phoneColors.nth(i).click();
                await this.page.waitForLoadState();
                break;
            }
        }
        this.logger.info('selected desired phone color: ' + colorName);
    }

    async addItemToCart() {
        await this.addToCart.first().click()
        await this.page.waitForLoadState();
        this.logger.info('item added to cart');
    }

    async gotoCart() {
        await this.cart.click()
        await this.cartItemList.last().waitFor();
        this.logger.info('navigated to cart page');
    }

    async verifyItemPresentOnCart() {
        const count = await this.cartItemList.count();
        expect(1).toBe(count);
        const itemName = await this.cartItemList.textContent();
        expect(itemName.toUpperCase().includes(this.item.toUpperCase())).toBeTruthy();
    }

    async selectNoProtection() {
        await this.protectionNotReq.first().click();
        await this.page.waitForLoadState('domcontentloaded');
        this.logger.info('no protection is selected');
    }

}

module.exports = { AmazonPage };