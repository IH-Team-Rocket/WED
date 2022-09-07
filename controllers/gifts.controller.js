const mongoose = require("mongoose");
const Gift = require("../models/Gift.model")
const Wedding = require("../models/Wedding.model")

module.exports.create = (req, res, next) => {
    const { id } = req.params
    res.render("gifts/form")
}

module.exports.doCreate = (req, res, next) => {
    const { id } = req.params
    req.body.wedding = id
    console.log(req.body.wedding);
    Gift.create(req.body)
        .then((gift) => {
            res.render("gifts/list", {weddingId: id})
        })
        .catch((err) => {
            console.log("entro");
            res.redirect("/wedding/:id/createGift")
        })
}

module.exports.list = (req, res, next) => {
    const { id } = req.params
    res.render("gifts/list", {weddingId: id})
}