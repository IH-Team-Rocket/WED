const Ticket = require("../models/Ticket.model")
const mongoose = require("mongoose")
const Wedding = require("../models/Wedding.model")
const User = require("../models/User.model")

module.exports.create = (req, res, next) => {
    res.render("ticket/form")
}

module.exports.doCreate = (req, res, next) => {
    const { id } = req.params
    const user = req.user
    req.body.wedding = id

    Ticket.create(req.body)
      .then((ticket) => {
        console.log(user.id);
        ticket.user = user.id
        ticket.wedding = id
        ticket.save()
        res.redirect(`/profile`, { id })
      })
      .catch((err) => {
        res.renderWithErrors("ticket/form")
      })
}