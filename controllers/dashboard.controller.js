const Ticket = require("../models/Ticket.model")
const mongoose = require("mongoose")
const Wedding = require("../models/Wedding.model")
const User = require("../models/User.model")

module.exports.dashboard = (req, res, next) => {
  const weddingId = req.params.id

  Ticket.find({ wedding: weddingId})
    .populate("user")
    .populate("wedding")
    .then((tickets) => {
      const wedding = tickets[0].wedding;
      res.render("dashboard/dashboard", {tickets, wedding})
    })
    .catch(() => {
      console.log("holi");
    })
}