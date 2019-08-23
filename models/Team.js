const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    activities: [{
        activityType: String,
        icon: String
    }],
    fields: [{
        name: String,
        dataType: String,
        inputType: String
    }],
    admin: {
        name: {first: String, last: String},
        email: String,
        password: String
    }
})

teamSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

teamSchema.methods.validPassword = (password, encrypted) => {
    return bcrypt.compareSync(password, encrypted);
}

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;