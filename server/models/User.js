const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
