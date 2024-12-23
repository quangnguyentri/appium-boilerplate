import GooglePage from '../pageobjects/google.page.js';
import GoogleSearchPage from '../pageobjects/google.search.page.js';
import ElfiDetailPage from '../pageobjects/elfi.detail.page.js';
import { DEFAULT_WAIT_ELEMENT_DISPLAY } from '../helpers/Constants.js';

describe('Elfi Search Test', () => {
    it('end to end elfi search test flow',  async () => {
        await browser.setTimeout({ 'script': DEFAULT_WAIT_ELEMENT_DISPLAY })
        await GooglePage.open();
        await GooglePage.search({key:'Elfie'});
        await GoogleSearchPage.clickOnFirstResult();
        await ElfiDetailPage.waitForPageLoad();
        await ElfiDetailPage.waitForCookiesPopup();
        await ElfiDetailPage.clickOnAcceptAllButton();
        await ElfiDetailPage.clickOnHambergerMenu();
        await ElfiDetailPage.clickOnXMenu();
        await ElfiDetailPage.scrollToCopyRightText();
        await ElfiDetailPage.waitAndVerifyCopyRightText();
    });
});
