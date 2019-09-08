import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

export const User = mongoose.model("User", UserSchema);
