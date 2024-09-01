const puppeteer = require("puppeteer");

async function amazonLink(productLink) {
  // try {
  const browser = await puppeteer.launch({
    // headless: false,
    // defaultViewport: false,
    // userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(productLink);

  //
  try {
    title = await page.$eval(
      ".product-title-word-break",
      (span) => span.innerText
    );

    price = await page.$eval(".a-price-whole", (span) => span.innerText);
    image = await page.$eval(".a-dynamic-image", (el) =>
      el.getAttribute("src")
    );
  } catch (err) {}

  await browser.close();
  let item = [];
  item.push({ title: title, price: price, image: image, link: productLink });

  return item;
}

module.exports = amazonLink;
