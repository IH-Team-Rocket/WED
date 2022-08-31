const Wedding = require("../models/Wedding.model");
const mongoose = require("mongoose");
const createError = require("http-errors");
const User = require("../models/User.model");

module.exports.create = (req, res, next) => {
  res.render("wedding/create")
}

module.exports.doCreate = (req, res, next) => {
  Wedding.create(req.body)
  .then((wedding) => {
    const users = Array(wedding.guests).fill('.').map(() => {
      return new User({ weddings: [wedding.id], email: null }).save()
    })
    return Promise.all(users)
      .then( createdUsers => {
        console.log(createdUsers);
        res.redirect(`/wedding/${wedding._id}`);
      })
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
}

module.exports.detail = (req, res, next) => {
  const { id } = req.params

  Wedding.findById(id)
    .then((wedding) => {
      res.render("wedding/detail", { wedding })
    })
    .catch((err) => {
      console.error(err);
      next(createError(404, "Wedding not found"));
    });
}