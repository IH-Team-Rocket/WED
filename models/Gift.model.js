const mongoose = require("mongoose");

const ENLACE = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig

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
        default: "https://res.cloudinary.com/ghotics/image/upload/v1663004440/WED/wedding_gift_oio6qe.jpg",
    },
    link: {
        type: String,
        required: true,
        match: ENLACE,
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