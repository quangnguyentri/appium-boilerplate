import Page from './page.js';
import { DEFAULT_WAIT_ELEMENT_DISPLAY } from '../helpers/Constants.js';

class GoogleSearchPage extends Page {
    get searchForm () { return $('header.Fh5muf'); }
    get searchedText() { return $('textarea[name="q"]'); }
    get searchAllResultParent() { return $('div[id="rso"]'); }
    get searchFirstResult() { return $('a[class="cz3goc OcpZAb"]'); }

    async waitForPageLoad() {
        await this.searchForm.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.searchedText.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.searchAllResultParent.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.searchFirstResult.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
    }

    async clickOnFirstResult() {
        await this.waitForPageLoad();
        await this.searchFirstResult.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.searchFirstResult.click();
    }

    async open():Promise<string> {
    }
}

export default new GoogleSearchPage();

