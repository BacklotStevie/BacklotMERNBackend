//schema for reviews
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    title: String,
    writer: String,
    genre: {
        type: String,
        required: true,
    },
    tags: [String],
    likeCount: {
        type: Number,
        default: 0,
    },
    reviews: Array,
    img: String,
}, {
    //when someone creates a review, a timestamp is added to the schema to see when the review was created
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewsSchema, "reviews");
