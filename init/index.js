const mongoose = require('mongoose');
const initData =  require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main()
.then(() => {
    console.log("connection succesfull")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("data was initialised")
};

initDB();