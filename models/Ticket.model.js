const mongoose = require("mongoose");

const SECONDOPTIONS = ["vegetarian", "fish", "meat"]

const ticketSchema = new mongoose.Schema({
    second: {
        type: String,
        required: true,
        enum: SECONDOPTIONS
    },
    bus: {
        type: Boolean,
        required: true,
        default: false,
    },
    hotel: {
        type: Boolean,
        required: true,
        default: false,
    },
    wedding: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Wedding"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},
{
    toObject:{ virtuals: true }
});

ticketSchema.virtual("userInfo", {
    ref:"User",
    localField:"user",
    foreignField:"_id",
    justOne: true
})

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket