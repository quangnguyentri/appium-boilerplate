import {Given, When, Then} from '@wdio/cucumber-framework'
import GooglePage from '../pageobjects/google.page.js';
import GoogleSearchPage from '../pageobjects/google.search.page.js';
import ElfiDetailPage from '../pageobjects/elfi.detail.page.js';

Given(/^I am on google search page$/, async () => {
    await GooglePage.open();
});

Given(/^I am on Elfie page$/, async () => {
    await ElfiDetailPage.waitForPageLoad();
});

When(/^I enter search keyword "(.*?)" and click on first search result item$/, async (keyword) => {
    await GooglePage.search({key:keyword});
    await GoogleSearchPage.clickOnFirstResult();
});

When(/^I click on hamburger menu$/, async () => {
    await ElfiDetailPage.clickOnHambergerMenu();
});

When(/^I scroll to footer section$/, async () => {
    await ElfiDetailPage.scrollToCopyRightText();
});

Then(/^I should see an Elfie page with logo display$/, async () => {
    await ElfiDetailPage.waitForPageLoad();
    await ElfiDetailPage.waitForCookiesPopup();
    await ElfiDetailPage.clickOnAcceptAllButton();
});

Then(/^I should see x-menu display$/, async () => {
    await ElfiDetailPage.clickOnXMenu();
});

Then(/^I should see the copy right text$/, async () => {
    await ElfiDetailPage.waitAndVerifyCopyRightText();
});
