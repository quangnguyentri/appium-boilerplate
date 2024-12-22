import GooglePage from '../pageobjects/google.page.js';
import GoogleSearchPage from '../pageobjects/google.search.page.js';
import ElfiDetailPage from '../pageobjects/elfi.detail.page.js';

describe('Elfi Search Test', () => {
    it('end to end elfi search test flow',  async () => {
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
