const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://instagram.com/rocketseat_oficial`);

  const imgList = await page.evaluate(() => {
    // get images inside posts area
    const nodeList = document.querySelectorAll('article img');

    // transform NodeList to Array
    const imgArray = [...nodeList];

    // transform nodes to JS objects
    const imgList = imgArray.map(({ src }) => ({
      src,
    }));

    return imgList;
  });

  // save data to local file (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('something went wrong');

    console.log('well done');
  });

  await browser.close();
})();