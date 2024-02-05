const { AmazonPage } = require("../../pages/AmazonPage");
const { DiscoverPage } = require("../../pages/DiscoverPage");


class POManager {

    #discoverPage;
    #amazonPage;

    constructor(page, logger) {
        this.page = page;
        this.logger = logger;
        this.#discoverPage = new DiscoverPage(this.page, this.logger);
        this.#amazonPage = new AmazonPage(this.page, this.logger);
    }

    getDiscoverPage() {
        return this.#discoverPage;
    }
    getAmazonPage() {
        return this.#amazonPage;
    }
}

module.exports = { POManager };