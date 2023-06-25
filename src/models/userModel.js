const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [10, "Email should be at least 10 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [4, "Email should be at least 4 characters long"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (!value) {
    throw new Error("Repeat password is required");
  }
  if (this.password !== value) {
    throw new Error("Passwords don't match");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;