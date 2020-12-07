const { browsers } = require('../browser_config.js');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert, expect } = require('chai');

browsers.forEach((browser) => {  
  describe('CircleCI Homepage Tests', function() {
    const driver = new Builder().forBrowser(browser).build();

    describe('Check page elements', async function() {
      it('['+browser+'] should load circleci.com', async function() {
        await driver.get('https://circleci.com');
      });


      it('['+browser+'] go to circleci.com and check the title', async function() {
        const title = await driver.getTitle();
        expect(title).to.equal('Continuous Integration and Delivery - CircleCI');
      });

      it('['+browser+'] product menu should be hidden', async function() {
        const menu = await driver.findElement(By.css("li:nth-of-type(1) > .submenu")).isDisplayed();
        expect(menu).to.be.false;
      });

      it('['+browser+'] should display product menu on hover', async function() {
        const productLink = await driver.findElement(By.linkText("Product"));
        await driver.actions().move({origin:productLink}).perform();
        const menu = await driver.findElement(By.css("li:nth-of-type(1) > .submenu")).isDisplayed();
        expect(menu).to.be.true;
      });
    });

    describe('Check links are correct', async function() {
      it('['+browser+'] should link correctly to Support', async function() {
        // const supportLink = await (await driver).findElement(By.linkText("Support"));
        // await driver.actions().move({origin:supportLink}).perform();
        const getSupportLink = await driver.findElement(By.linkText("Get Support"));
        const supportURL = await getSupportLink.getAttribute('href');
        expect(supportURL).to.equal('https://support.circleci.com/hc/en-us/');
      });

      it('['+browser+'] should link correctly to Pricing', async function() {
        const pricingLink = await driver.findElement(By.linkText("Pricing"));
        const pricingURL = await pricingLink.getAttribute('href');
        expect(pricingURL).to.equal('https://circleci.com/pricing/');
      });
    });

    after(function() {
      driver.quit();
    });
  });
});