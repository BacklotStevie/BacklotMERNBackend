//schema for users
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstname: String,
    lasname: String,
    password: {
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        //two different types of users
        enum: ["normal", "admin"],
        default: "normal",
    },
}, {
    //when someone creates a user, a timestamp is added to the schema to see when the user was created
    timestamps: true,
})

module.exports = mongoose.model("Users", usersSchema, "users")
