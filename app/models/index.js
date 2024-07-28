import mongoose from 'mongoose';
import dbConfig from "../config/db.config.js";
import createUserModel from "./user.model.js";

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = createUserModel(mongoose);

// Connect to MongoDB and initialize the autoIncrement plugin
mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database!");
}).catch(err => {
  console.error("Cannot connect to the database!", err);
  process.exit();
});

export default db;
