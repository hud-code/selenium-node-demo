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

      it('['+browser+'] cookie banner present', async function() {
        if (process.env.CIRCLECI) {
          this.skip();
        } else {
          await driver.sleep(2000);
          await driver.wait(until.elementIsVisible(driver.findElement(By.id('cookiebanner'))));
          const cookieBanner = await driver.findElement(By.id('cookiebanner'));
          expect(await cookieBanner.isDisplayed()).to.be.true;
        }
      });

      it('['+browser+'] dismiss cookie banner', async function() {
        if (process.env.CIRCLECI) {
          this.skip();
        } else {
          await driver.sleep(2000);
          await driver.wait(until.elementIsVisible(driver.findElement(By.className('c-button'), 5000)));
          await driver.findElement(By.className('c-button')).click();
          const cookieButton = await driver.findElement(By.className('c-button')).isDisplayed();
          expect(cookieButton).to.be.false;
        }
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

      it('['+browser+'] should display the language selector', async function() {
        const languageSelector = await driver.findElement(By.id('languageSelectDropdown')).click();
        const languageMenu = await driver.findElement(By.className('dropdown-menu')).isDisplayed();

        const image = await driver.takeScreenshot();
        await require('fs').writeFile('./test_results/'+browser+'_language_selector.png', image, 'base64', function(err) {
          console.log(err);
        });

        expect(languageMenu).to.be.true;
      });
    });

    describe('Check links are correct', async function() {
      it('['+browser+'] should link correctly to Support', async function() {
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