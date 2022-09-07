const Ticket = require("../models/Ticket.model")
const mongoose = require("mongoose")
const Wedding = require("../models/Wedding.model")

module.exports.create = (req, res, next) => {
    res.render("ticket/form")
}

/* module.exports.doCreate(req, res, next) => {

} */