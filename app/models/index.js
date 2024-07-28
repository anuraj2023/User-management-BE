import mongoose from 'mongoose';

import dbConfig from "../config/db.config.js";

import createUserModel from "./user.model.js";

mongoose.Promise = global.Promise;

const db         = {};
db.mongoose      = mongoose;
db.url           = dbConfig.url;
db.users         = createUserModel(mongoose);

export default db;  