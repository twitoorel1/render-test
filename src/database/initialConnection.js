const mongoose = require("mongoose");
let DevMode = true;

const OPTIONS_MONGODB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const initialMongoDBConnection = () => {
  mongoose.set("strictQuery", false);

  switch (DevMode) {
    case true:
      const uriDatabase = process.env.MONGODB_URI_DEV;
      mongoose
        .connect(uriDatabase, OPTIONS_MONGODB)
        .then(() => console.log("💻 MongoDB Connected (Development Mode)"))
        .catch((err) =>
          console.log("Not Connected To Database (Development Mode)")
        );
      break;

    case false:
      const mongoDBProduction = {
        base_uri: process.env.MONGO_ATLAS_URI,
        username: process.env.MONGO_ATLAS_USERNAME,
        password: process.env.MONGO_ATLAS_PASSWORD,
        database: process.env.MONGO_ATLAS_DATABASE,
      };

      const uri = mongoDBProduction.base_uri
        .replace("<username>", mongoDBProduction.username)
        .replace("<password>", mongoDBProduction.password)
        .replace("<database>", mongoDBProduction.database);

      mongoose
        .connect(uri, OPTIONS_MONGODB)
        .then(() => console.log("💻 MongoDB Connected (Production Mode)"))
        .catch(() =>
          console.log("Not Connected To Database (Production Mode)")
        );
      break;

    default:
      console.log("Please set DevMode to True or False");
      break;
  }
};

module.exports = initialMongoDBConnection;
