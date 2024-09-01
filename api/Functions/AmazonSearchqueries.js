const Fetching = require("./Fetching");
var searchField = [
  "Smartphones",
  "Laptops",
  "Watches",
  "Fashion",
  "Electronics",
  "HeadPhones",
  "Iphones",
  "Xiaomi",
  "Redmi",
  "Poco",
];

async function AmazonSearchqueries() {
  for (const search of searchField) {
    await Fetching(search);
  }
}

module.exports = AmazonSearchqueries;
