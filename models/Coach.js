const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Coach"
    },
    athletes: [{
        type: Schema.Types.ObjectId,
        ref: "Athlete"
    }]
});

const Coach = mongoose.model("Coach", coachSchema);

module.exports = Coach;