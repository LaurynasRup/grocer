const puppeteer = require("puppeteer");

const searchTerm = "tomato";

const searchUrl = `https://groceries.asda.com/search/${searchTerm}`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(searchUrl);

  await page.waitForSelector(".co-product");

  const productWrapper = await page.$(".co-product");

  const title = await productWrapper.$(
    ".co-product__title > .co-product__anchor"
  );

  const titleValue = await title.evaluate((el) => el.textContent);

  browser.close();
})();
