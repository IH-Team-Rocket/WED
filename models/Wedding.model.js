const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    partnerOne: {
        type: String,
        required: true,
        minLength: 3,
    },
    partnerTwo: {
        type: String,
        required: true,
        minLength: 3,
    },
    /* location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
      }
    }, */
    guests: {
      type: Number,
      required: true,
      min: 0,
      max: 499,
    }
});

const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;