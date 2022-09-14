const Ticket = require("../models/Ticket.model")
const mongoose = require("mongoose")
const Wedding = require("../models/Wedding.model")
const User = require("../models/User.model")

module.exports.dashboard = (req, res, next) => {
  const weddingId = req.params.id

  Ticket.find({ wedding: weddingId})
    .populate("user")
    .populate({
      path: "wedding",
      populate: {
        path: "gifts"
      }
    })
    .then((tickets) => {
      const wedding = tickets[0].wedding;
      res.render("dashboard/dashboard", {tickets, wedding})
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports.tokens = (req, res, next) => {
  tokens = [],
  User.find()
    .then((users) => {
      users.forEach((user) => {
        if(user.token !== null) {
          tokens.push(user.token)
        }
      })
      res.render("dashboard/tokens", {users, tokensLength: tokens.length})
    })
    .catch((err) => {
      console.log(err);
    })
}