import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,

    required: [true, "Please give name of the user"],
  },
  phoneNumber: {
    type: String,
    required: true,
    min: [10, "Please give all 10 digits !"],
  },
  email: {
    type: String,
    required: [true, "Please give email of the user"],
  },
  hobbies: {
    type: String,
    required: [true, "Please give hobbies of the user"],
  },
});
userSchema.plugin(AutoIncrement, { inc_field: "id" });
const createUserModel = (mongoose) => {
  const User = mongoose.model(
    "User",
    mongoose.Schema(userSchema, { timestamps: true })
  );

  return User;
};
export default createUserModel;
