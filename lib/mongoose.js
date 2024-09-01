const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongodbConnect = async () => {
  const uri =
    "mongodb+srv://dakshmahajan29:Mahaksh%40123@cluster0.u8aqv.mongodb.net/myDatabase?retryWrites=true&w=majority";
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = mongodbConnect;
