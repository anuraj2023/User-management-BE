const dbName = process.env.MONGODB_DEFAULT_DB;
const dbHost = process.env.MONGODB_HOST;
const mongoUser=process.env.MONGO_USERNAME
const mongoPassword=process.env.MONGO_PASSWORD
const encodedPassword = encodeURIComponent(mongoPassword);
const dbConfig = {
  url: `mongodb+srv://${mongoUser}:${encodedPassword}@${dbHost}/${dbName}`,
};
export default dbConfig;
