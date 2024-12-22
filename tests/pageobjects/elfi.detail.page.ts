import Page from './page.js';
import { DEFAULT_WAIT_ELEMENT_DISPLAY } from '../helpers/Constants.js';

class ElfiDetailPage extends Page {
    get elfiLogo() { return $('a[class="brand w-nav-brand w--current"]'); }
    get hamburgerMenu() { return $('div[class="menu-button w-nav-button"]') }
    get xMenu() { return $('div[class="menu-button w-nav-button w--open"]') }
    get footerCopyRightText() { return $('div.footer-content-bottom div.text-block') }
    get cookiePopupParent() { return $('div.cky-consent-bar'); }
    get acceptAllButton() { return $('button[class="cky-btn cky-btn-accept"]') }
    get rejectAllButton() { return $('button[class="cky-btn cky-btn-reject"]') }


    async waitForPageLoad() {
        await this.elfiLogo.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await browser.saveScreenshot('./screenshots/waitForElfiLogo.png');
        await this.hamburgerMenu.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
    }

    async waitAndVerifyCopyRightText() {
        this.footerCopyRightText.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await expect(await this.footerCopyRightText).toHaveText(
                    expect.stringContaining('Bản quyền © 2024 Elfie Pte. Ltd.'));
    }

    async clickOnHambergerMenu() {
        await this.hamburgerMenu.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.hamburgerMenu.click();
        await this.xMenu.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
    }

    async clickOnXMenu() {
        await this.xMenu.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await browser.saveScreenshot('./screenshots/clickedHambergerMenu.png');
        await this.xMenu.click();
    }

    async waitForCookiesPopup() {
        await this.cookiePopupParent.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.acceptAllButton.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
        await this.rejectAllButton.waitForDisplayed({ timeout: DEFAULT_WAIT_ELEMENT_DISPLAY });
    }

    async scrollToCopyRightText() {
        await this.footerCopyRightText.scrollIntoView();
        await browser.saveScreenshot('./screenshots/footerCopyRight.png');
    }

    async clickOnAcceptAllButton() {
        await this.acceptAllButton.click();
    }

    async open():Promise<string> {
    }
}

export default new ElfiDetailPage();

