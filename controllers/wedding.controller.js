const Wedding = require("../models/Wedding.model");
const mongoose = require("mongoose");
const createError = require("http-errors")

module.exports.create = (req, res, next) => {
  res.render("wedding/create")
}

module.exports.doCreate = (req, res, next) => {
  Wedding.create(req.body)
  .then((wedding) => {
    res.redirect(`/wedding/${wedding._id}`);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
}