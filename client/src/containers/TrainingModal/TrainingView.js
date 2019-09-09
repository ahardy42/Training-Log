import React from 'react';
import colorFuncs from '../../utils/colorFuncs';
import moment from 'moment';


const TrainingView = ({ trainingArray, index }) => {
    // if trainingArray is empty, just return the empty array so this doesn't error out on load
    let training = trainingArray.length === 0 ? trainingArray : trainingArray[index];
    const returnDuration = duration => {
        let hours = Math.floor(duration / 60);
        let min = duration % 60;
        if (hours < 1) {
            return `${min} minutes`;
        } else if (min === 0) {
            return `${hours} hours`;
        } else {
            return `${hours} hours and ${min} minutes`
        }
    }
    return (
        <ul className="list-group">
            <li className="list-group-item">Date: {moment(training.date).format("MM/DD/YYYY")}</li>
            <li className="list-group-item">Type: {training.mode}</li>
            <li className="list-group-item">Duration: {returnDuration(training.duration)}</li>
            <li className="list-group-item list-bar">Intensity: <span style={colorFuncs.intensityBar(training)}></span></li>
            <li className="list-group-item list-bar">Feeling: <span style={colorFuncs.feelingBar(training)}></span></li>
            <li className="list-group-item">Comments: {training.comment}</li>
            {training.coachComment ? <li className="list-group-item">Coach Says: {training.coachComment}</li> : null}
        </ul>
    )
}

export default TrainingView;