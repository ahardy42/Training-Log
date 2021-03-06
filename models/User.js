const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    date: {
        type: Date,
        required: true,
        default: new Date() // date object
    },
    duration: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    intensity: {
        type: Number,
        required: true
    },
    feeling: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        require: false
    },
    coachComment: {
        type: String,
        require: false
    }
});

const userSchema = new Schema({
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
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
        required: true
    },
    email: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    training: [trainingSchema],
    type: {
        type: String,
        required: true,
        default: "Athlete"
    },
    resetKey: String
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function (password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", userSchema);

module.exports = User;