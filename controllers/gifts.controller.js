const mongoose = require("mongoose");
const Gift = require("../models/Gift.model")
const Wedding = require("../models/Wedding.model")

module.exports.create = (req, res, next) => {
    const { id } = req.params
    res.render("gifts/form", {weddingId: id})
}

module.exports.doCreate = (req, res, next) => {
    const { id } = req.params
    req.body.wedding = id
    Gift.create(req.body)
        .then((gift) => {
            
            res.redirect(`/wedding/${id}/gifts`)
        })
        .catch((err) => {
            res.render("gifts/form", {errors: err.errors})
        })
}

module.exports.list = (req, res, next) => {
    const { id } = req.params
		Wedding.findById(id)
			.populate("gifts")
			.then(wedding => {
				res.render("gifts/list", {weddingId: id, wedding})
			})
			.catch()
    
}