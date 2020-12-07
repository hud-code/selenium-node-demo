const { browsers } = require('../browser_config.js');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert, expect } = require('chai');

browsers.forEach((browser) => {  
  describe('CircleCI Homepage Tests', function() {
    const driver = new Builder().forBrowser(browser).build();

    it('['+browser+'] go to circleci.com and check the title', async function() {
      await driver.get('https://circleci.com');
      const title = await driver.getTitle();
      expect(title).to.equal('Continuous Integration and Delivery - CircleCI');
    });

    it('['+browser+'] product menu should be hidden', async function() {
      await driver.get('https://circleci.com');
      const menu = await driver.findElement(By.css("li:nth-of-type(1) > .submenu")).isDisplayed();
      expect(menu).to.be.false;
    });

    it('['+browser+'] should display product menu on hover', async function() {
      await driver.get('https://circleci.com');
      const productLink = await driver.findElement(By.linkText("Product"));
      await driver.actions().move({origin:productLink}).perform();
      const menu = await driver.findElement(By.css("li:nth-of-type(1) > .submenu")).isDisplayed();
      expect(menu).to.be.true;
    });

    it('['+browser+'] should link correctly to Support', async function() {
      await driver.get('https://circleci.com');
    });

    after(function() {
      driver.quit();
    });
  });
});