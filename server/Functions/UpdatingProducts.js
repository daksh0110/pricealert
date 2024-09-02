const amazon = require("../lib/amazon");

const amazonLink = require("../lib/amazonLink");

const productLink = require("../schema/ProductLinkSchema");
const Products = require("../schema/ProductSchema");

async function UpdatingProducts() {
  const productDocs = await Products.find();

  for (const product of productDocs) {
    const link = product.productLink;
    if (link) {
      const item = await amazonLink(link);
      console.log(item);
      const doc = await Products.findOne({ title: item[0].title });
      console.log(doc);
      if (doc) {
        (doc.price = item.price),
          doc.priceHistory.push({ price: item.price }),
          (doc.WebSite = "Amazon"),
          (doc.category = item.category),
          (doc.productLink = "http://" + item.link),
          (doc.currentDate = new Date());
        await doc.save();
        console.log("doc is saved");
      }
    }
  }
}
module.exports = UpdatingProducts();
