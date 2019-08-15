const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const tempSchema = new Schema({
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
    accessKey: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true,
        default: "Athlete"
    }
});

tempSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

tempSchema.methods.validPassword = function (password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const Temp = mongoose.model("Temp", tempSchema);

module.exports = Temp;