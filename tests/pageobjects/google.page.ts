import Page from './page.js';
import { DEFAULT_WAIT_ELEMENT_DISPLAY } from '../helpers/Constants.js';

class GooglePage extends Page {
    get searchInput () { return $('textarea[name="q"]'); }

    async waitForPageLoad() {
        await this.searchInput.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
    }

    async search ({ key }: {key:string;}) {
        await this.waitForPageLoad();
        await this.searchInput.setValue(key);
        await driver.keys('Enter');
    }

    async open():Promise<string> {
        return super.open('https://google.com');
    }
}

export default new GooglePage();

