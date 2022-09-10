const mongoose = require("mongoose");

const ENLACE = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

const giftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Minimum name length is 3"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Minimum description length is 10"]
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        required: true,
        match: ENLACE
    },
    selected: {
        type: Boolean,
        required: true,
        default: false,
    },
    wedding: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Wedding"
    }
});

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift