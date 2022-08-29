const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TYPES = ["user", "organiser", "plusOne"];

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [EMAIL_PATTERN, "Email pattern does not match"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [PASSWORD_PATTERN, "Password must contain 8 characters"],
    },
    googleID: {
        type: String
    },
    type: {
        type: String,
        enum: TYPES,
        required: true,
    },
    kids: {
      type: Number,
      min: 0,
      max: 3
    },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;