import mongoose from "mongoose";
import autoIncrement from "mongoose-plugin-autoinc";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please give name of the user"],
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: [10, "Please give all 10 digits!"],
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

// AutoIncrement
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User', 
  field: 'id', 
  startAt: 1, 
  incrementBy: 1, 
});

// Create User model
const createUserModel = (mongoose) => {
  const User = mongoose.model("User", userSchema);
  return User;
};

export default createUserModel;
