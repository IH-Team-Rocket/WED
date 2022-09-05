const mongoose = require("mongoose");
const Gift = require("../models/Gift.model")

module.exports.create = (req, res, next) => {
  res.render("gift/form");
}

module.exports.doCreate = (req, res, next) => {
  Gift.create(req.body)
    .then((gift) => {
        res.render("gifts/list")
    })
    .catch((err) => {
        res.redirect("/wedding/:id/createGift")
    })
}

module.exports.list = (req, res, next) => {
    res.render("gifts/list")
}