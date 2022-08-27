const mongoose = require("mongoose");

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
    },
    selected: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift