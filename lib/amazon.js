const puppeteer = require("puppeteer");

const amazonLink = require("./amazonLink");

const productLink = require("../schema/ProductLinkSchema");
const Products = require("../schema/ProductSchema");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const amazon = async (search, retries = 3, delayMs = 3000) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const browser = await puppeteer.launch({
        // headless: false,
        // defaultViewport: false,
        // userDataDir: "./tmp",
      });
      const page = await browser.newPage();
      await page.goto("https://www.amazon.in");
      console.log("reachedhere");
      await page.type(`input[id="twotabsearchtextbox"]`, search);
      await page.click(`input[id="nav-search-submit-button"]`);
      await page.waitForSelector('div[data-component-type="s-search-result"]');

      const products = await page.$$(
        `div[data-component-type="s-search-result"]`
      );
      const items = [];

      for (const product of products) {
        let title = "NULL";
        let price = "NULL";
        let image = null;
        let link = null;
        const category = search;

        try {
          title = await page.evaluate(
            (el) => el.querySelector("h2 > a > span").textContent,
            product
          );
        } catch (error) {}
        try {
          price = await page.evaluate(
            (el) => el.querySelector(".a-price-whole").textContent,
            product
          );
        } catch (error) {}
        try {
          image = await page.evaluate(
            (el) => el.querySelector(".s-image").getAttribute("src"),
            product
          );
        } catch (error) {}
        try {
          link =
            "amazon.in" +
            (await page.evaluate(
              (el) => el.querySelector(".a-link-normal").getAttribute("href"),
              product
            ));
        } catch (error) {}

        if (title != "NULL") {
          items.push({ title, price, image, category, link });
        }
      }

      await browser.close();
      let filteredItems = [];
      for (const item of items) {
        const doc = await Products.findOne({ title: item.title });
        if (!doc) {
          filteredItems.push(item);
        }
      }

      return filteredItems;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
      attempt++;

      if (attempt < retries) {
        console.log(`Retrying in ${delayMs / 1000} seconds...`);
        await delay(delayMs); // Wait before retrying
      } else {
        throw new Error(`Failed to fetch items after ${retries} attempts`);
      }
    }
  }
};

module.exports = amazon;
