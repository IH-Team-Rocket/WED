const Wedding = require("../models/Wedding.model");
const mongoose = require("mongoose");
const createError = require("http-errors");
const User = require("../models/User.model");
const randToken = require('rand-token');

module.exports.create = (req, res, next) => {
  res.render("wedding/create")
}

module.exports.doCreate = (req, res, next) => {
  req.body.admin = req.user.id

  Wedding.create(req.body)
    .then((wedding) => {
      req.user.weddings.push(wedding.id)
      req.user.save()
      .then(() => {
        res.redirect(`/wedding/${wedding.id}/ticket`)
      })
      .catch((err) => {
        res.renderWithErrors("user/profile")
      })
      const users = Array(wedding.guests).fill('.').map(() => {
        const randPass = (function() {
          return randToken.generate(64);
        })()
        return new User({ weddings: [wedding.id], email: undefined, password: randPass }).save()
      })
      return Promise.all(users)
        .then()
    })
    .catch((err) => {
      next(err);
    });
}

module.exports.detail = (req, res, next) => {
  const { id } = req.params

  Wedding.findById(id)
    .then((wedding) => {
      if (req.user.id == wedding.admin) {
        weddingAdmin = true
      }
      console.log(weddingAdmin);
      res.render("wedding/detail", { wedding, weddingAdmin })
    })
    .catch((err) => {
      next(createError(404, "Wedding not found"));
    });
}