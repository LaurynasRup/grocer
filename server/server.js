const puppeteer = require('puppeteer');

const searchTerm = 'tomato';

const searchUrl = `https://groceries.asda.com/search/${searchTerm}`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(searchUrl);

  const productArr = [];

  await page.waitForSelector('.co-product');

  const productWrappers = await page.$$('.co-product');

  for (wrapper of productWrappers) {
    const title = await wrapper.$('.co-product__title > .co-product__anchor');

    const price = await wrapper.$('.co-product__price');

    const volume = await wrapper.$('.co-item__volume');

    const image = await wrapper.$('.co-item__image');

    const titleValue = await title.evaluate(el => el.textContent);

    const priceValue = await price.evaluate(el => el.textContent);

    const volumeValue = await volume.evaluate(el => el.textContent);

    const imageSrc = await image.evaluate(el => el.getAttribute('src'));

    const productObj = {
      title: titleValue,
      price: priceValue,
      volume: volumeValue,
      imgSrc: imageSrc,
    };

    productArr.push(productObj);
  }

  console.log(productArr);

  browser.close();
})();
