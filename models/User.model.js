const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const randToken = require('rand-token');

const TYPES = ["user", "organiser", "plusOne"];

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name must contain at least 3 characters"]
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        match: [EMAIL_PATTERN, "Email pattern does not match"],
    },
    password: {
        type: String,
        match: [PASSWORD_PATTERN, "Password must contain 8 characters"],
        required: true,
    },
    googleID: {
        type: String
    },
    type: {
        type: String,
        enum: TYPES,
        default: "user",
        required: true,
    },
    kids: {
      type: Number,
      min: 0,
      max: 3
    },
    weddings: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Wedding"
    },
    token: {
      type: String,
      default: function() {
        return randToken.generate(64);
      }
    }
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