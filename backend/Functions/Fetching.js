const amazon = require("../lib/amazon");

const amazonLink = require("../lib/amazonLink");

const productLink = require("../schema/ProductLinkSchema");
const Products = require("../schema/ProductSchema");

async function Fetching(searchquery) {
  console.log("it reached here");
  if (searchquery.includes("amazon")) {
    const item = await amazonLink(searchquery);
    const doc = await Products.findOne({ title: item[0].title });
    (doc.price = item[0].price),
      doc.priceHistory.push({ price: item[0].price }),
      (doc.WebSite = "Amazon"),
      (doc.category = item.category),
      (doc.productLink = item[0].link),
      (doc.currentDate = new Date());
    await doc.save();
  } else {
    const items = await amazon(searchquery);

    await Promise.all(
      items.map(async (item) => {
        const doc = await Products.findOne({ title: item.title }).exec();

        if (!doc) {
          const ProductRef = new Products({
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category,
            WebSite: "Amazon",
            priceHistory: [{ price: item.price }],
            productLink: "http://" + item.link,
            currentDate: new Date(),
          });

          await ProductRef.save();
        } else {
          (doc.price = item.price),
            doc.priceHistory.push({ price: item.price }),
            (doc.WebSite = "Amazon"),
            (doc.category = item.category),
            (doc.productLink = "http://" + item.link),
            (doc.currentDate = new Date());
          await doc.save();
        }
      })
    );
  }
}

module.exports = Fetching;
