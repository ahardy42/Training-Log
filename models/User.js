const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "Athlete"
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function (password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", userSchema);

module.exports = User;