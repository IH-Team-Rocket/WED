const User = require("../models/User.model");
const mongoose = require("mongoose");
const createError = require("http-errors")

module.exports.edit = (req, res, next) => {
  const { id } = req.params
  res.render(`/edit/${id}`)
}

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params
  const data = req.body
  User.findById(id)
    .then(user => {
        if(user) {
            return User.findByIdAndUpdate(id, req.body, { new: true })
              .then((user) => {
                 res.redirect(200, "/user/:id")
              })
              .catch(err => {
              })
           }
    })
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params

    
    User.findById(id)
    .then((user) => {
        console.log(user)
        res.render("user/profile")
    })
    .catch((err) => {
        next(createError(404, "User not found"))
    })
}