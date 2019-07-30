const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
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
    comment: {
        type: String,
        require: false
    },
    coachComment: {
        type: String,
        require: false
    }
})

const athleteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    training: [trainingSchema]
});

const Athlete = mongoose.model("Athlete", athleteSchema);

module.exports = Athlete;