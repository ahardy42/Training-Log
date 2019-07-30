const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    athletes: [{
        type: Schema.Types.ObjectId,
        ref: "Athlete"
    }]
});

const Coach = mongoose.model("Coach", coachSchema);

module.exports = Coach;