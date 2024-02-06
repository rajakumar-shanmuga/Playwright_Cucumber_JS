const { expect } = require('@playwright/test');

class AmazonPage {
    constructor(page, logger) {
        this.page = page;
        this.logger = logger;
        this.seachBox = this.page.locator('#twotabsearchtextbox');
        this.searchResults = this.page.locator('.s-search-results [data-component-type=s-search-result] [data-cy=title-recipe]');
        this.phoneColors = this.page.locator('#variation_color_name [id*=color_name] img');
        this.addToCart = this.page.locator('#add-to-cart-button');
        this.cart = this.page.getByLabel('1 item in cart');
        this.cartItemList = this.page.locator('.sc-list-item-content .a-truncate-cut');
        this.protectionNotReq = this.page.locator('[aria-labelledby=attachSiNoCoverage-announce]');
        this.AddedToCartText = this.page.locator('span:has-text("Added to Cart")');
    }

    async searchWithKeyword(searchKeyword) {

        await this.seachBox.click();
        await this.seachBox.fill(searchKeyword, { delay: 10 });
        await this.page.keyboard.press('Enter');
        this.logger.info('search keyword: ' + searchKeyword);
    }

    async selectDesiredItem(item) {
        let data;
        await this.searchResults.first().waitFor({waitUntil:'domcontentloaded',timeout:6000});
        const count = await this.searchResults.count();
    
        this.item = item;
        for (let i = 0; i < count; i++) {
            const desiredItem = await this.searchResults.nth(i);
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
        this.logger.info('item added to cart');
    }

    async gotoCart() {
        await this.cart.waitFor({state:'visible'});
        await this.cart.click()
        this.logger.info('navigated to cart page');
    }

    async verifyItemPresentOnCart() {
        await this.cartItemList.waitFor({state:'visible',timeout:5000})
        const count = await this.cartItemList.count();
        expect(1).toBe(count);
        const itemName = await this.cartItemList.textContent();
        expect(itemName.toUpperCase().includes(this.item.toUpperCase())).toBeTruthy();
    }

    async selectNoProtection() {
        await this.protectionNotReq.first().click();
        this.logger.info('no protection is selected');
    }

    async verifyItemAddedSuccessfully() {
        await expect(this.AddedToCartText).toContainText('Added to Cart');
        this.logger.info('item added successfully');
    }

}

module.exports = { AmazonPage };