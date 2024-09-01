var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodbConnect = require("./lib/mongoose");
const amazon = require("./lib/amazon");
const User = require("./schema/createUserData");
const { encryption, decryption } = require("./lib/encryption");
const mobile = require("./schema/ProductSchema");
const jwt = require("jsonwebtoken");
const amazonLink = require("./lib/amazonLink");
var cron = require("node-cron");
const productLink = require("./schema/ProductLinkSchema");
const Fetching = require("./Functions/Fetching");
const { compareSync } = require("bcrypt");
const EmailModule = require("./lib/EmailModule");
const AlertList = require("./schema/emailAlertSchema");
const AmazonSearchqueries = require("./Functions/AmazonSearchqueries");
const UpdatingProducts = require("./Functions/UpdatingProducts");
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongodbConnect();
cron.schedule("0 * * * *", async () => {
  console.log("running a task every day");

  AmazonSearchqueries();

  // UpdatingProducts();
  // const docs = await AlertList.find();

  // for (const doc of docs) {
  //   const productDoc = await mobile.findById(doc.productId);
  //   if (productDoc) {
  //     const price = Number(productDoc.price.replace(/,/g, ""));

  //     if (price < doc.AlertAmount) {
  //       EmailModule(doc.userEmail, productDoc);
  //     }
  //   }
  // }
});
async function getRandomDocuments() {
  const randomDocs = await mobile.aggregate([
    { $sample: { size: 25 } }, // Fetch 25 random documents
  ]);

  return randomDocs;
}

app.get("/", async function (req, res) {
  const docs = [];

  docs.push(await getRandomDocuments());
  res.send(docs);
});

app.get("/Search", async function async(req, res) {
  const { searchquery } = req.query;
  if (searchquery.includes("amazon")) {
    let array = [];
    const doc = await mobile.findOne({ productLink: searchquery });

    if (doc) {
      array.push(doc);
      res.send(array);
    } else {
      const linkRef = new productLink({
        productLink: searchquery,
      });
      await linkRef.save();

      const item = await amazonLink(searchquery);
      console.log(item);
      const existingTitle = await mobile.findOne({ title: item[0].title });
      if (existingTitle) {
        array.push(existingTitle);

        res.send(array);
      } else {
        console.log("not sending...");
        const mobileRef = new mobile({
          title: item[0].title,
          price: item[0].price,
          image: item[0].image,
          WebSite: "Amazon",
          priceHistory: [{ price: item[0].price }],
          productLink: item[0].link,
          currentDate: new Date(),
        });
        await mobileRef.save();
        const doc = await mobile.findOne({ productLink: searchquery });
        // array.push(doc);
        res.send(array);
      }
    }
  } else {
    const doc = await mobile
      .find({ title: new RegExp(searchquery, "i") })
      .exec();
    console.log(doc.length);
    res.send(doc);
  }
});

app.get("/id", async function (req, res) {
  const { id } = req.query;
  res.send(await mobile.findById(id).exec());
});

app.post("/", async function (req, res) {
  const { search } = req.body;
  console.log(search);
  searchField.push(search);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    if (decryption(password, user.password)) {
      jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        "privatekey",
        { expiresIn: "12h" },
        (err, token) => {
          if (err) {
            console.log(err);
          }
          res.send(token);
        }
      );
    } else {
      console.log("ERROR: Could not log in");
    }
  } else {
    res.send("Its not");
  }
});
app.post("/Signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    res.send("user Already exist");
  } else {
    const userRef = new User({
      name: name,
      email: email,
      password: encryption(password),
    });

    userRef.save();
  }
  res.status(200);
});
app.post("/emailalert", async (req, res) => {
  const { user, amount, id } = req.body;
  const Alertref = new AlertList({
    userName: user.name,
    userEmail: user.email,
    productId: id,
    AlertAmount: amount,
  });
  await Alertref.save();
  res.send("checked");
});
app.get("/alertlist/", async (req, res) => {
  const email = req.query.id;
  let products = [];
  const Alerts = await AlertList.find({ userEmail: email }).exec();
  for (const alert of Alerts) {
    const product = await mobile.findById(alert.productId);
    if (product) {
      products.push(product);
    }
  }
  res.send(products);
});
app.listen(9000, function () {
  console.log("Example app listening on port!");
});
