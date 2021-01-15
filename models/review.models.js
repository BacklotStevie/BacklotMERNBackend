//schema for reviews
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    heading: String,
    info: String,
}, {
    timestamps: true,
});

const reviewsSchema = new Schema({
    title: String,
    writer: String,
    genre: {
        type: String,
        required: true,
    },
    reviews: [infoSchema],
    img: String,
}, {
    //when someone creates a review, a timestamp is added to the schema to see when the review was created
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewsSchema, "reviews");
module.exports = mongoose.model("Info", infoSchema, "info");