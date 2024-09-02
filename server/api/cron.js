const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const mongodbConnect = require("../lib/mongoose");
const amazon = require("../lib/amazon");
const User = require("../schema/createUserData");

const mobile = require("../schema/ProductSchema");

const amazonLink = require("../lib/amazonLink");

const productLink = require("../schema/ProductLinkSchema");
const Fetching = require("../Functions/Fetching");

const EmailModule = require("../lib/EmailModule");
const AlertList = require("../schema/emailAlertSchema");
const AmazonSearchqueries = require("../Functions/AmazonSearchqueries");
const UpdatingProducts = require("../Functions/UpdatingProducts");
app.get("/api/cron", async (req, res) => {
  try {
    await AmazonSearchqueries();

    await UpdatingProducts();
    res.status(200).send("Scheduled task executed successfully.");
  } catch (error) {
    console.error("Error executing scheduled task:", error);
    res.status(500).send("Error executing scheduled task.");
  }
});

module.exports = app;
