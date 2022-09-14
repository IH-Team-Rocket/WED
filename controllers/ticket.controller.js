const Ticket = require("../models/Ticket.model")
const mongoose = require("mongoose")
const Wedding = require("../models/Wedding.model")
const User = require("../models/User.model")

module.exports.create = (req, res, next) => {
    const { id } = req.params
    res.render("ticket/form", {weddingId: id})
}

module.exports.doCreate = (req, res, next) => {
    const { id } = req.params
    const user = req.user
    req.body.user = user.id
    req.body.wedding = id
    req.body.bus = Boolean(req.body.bus)
    req.body.hotel = Boolean(req.body.hotel)
    console.log(req.body);

    Ticket.findOne({ wedding: id, user: user.id })
      .then(ticket => {
        if (!ticket) {
          Ticket.create(req.body)
            .then((ticket) => {
            //console.log(ticket);
            res.redirect(`/profile`)
          })
          .catch((err) => {
            console.error(req.body, err);
            //res.renderWithErrors("ticket/form")
          })
        } else {
          Ticket.findOneAndUpdate(ticket, req.body, { new: true })
            .then(ticket => {
              //console.log(req.body);
              res.redirect('/profile')
            })
            .catch(err => {
              console.error(req.body, err)
            })
        }
      })
      
}