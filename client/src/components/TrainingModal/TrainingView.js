import React from 'react';
import './TrainingModal.css';

const TrainingView = ({ trainingArray, index }) => {
    // if trainingArray is empty, just return the empty array so this doesn't error out on load
    let training = trainingArray.length === 0 ? trainingArray : trainingArray[index];
    return (
        <ul className="list-group">
            <li className="list-group-item">Date: {training.reformattedDate}</li>
            <li className="list-group-item">Type: {training.mode}</li>
            <li className="list-group-item">Duration: {training.duration} minutes</li>
            <li className="list-group-item">Intensity: {training.intensity}</li>
            <li className="list-group-item">Feeling: {training.feeling}</li>
            <li className="list-group-item">Comments: {training.comment}</li>
        </ul>
    )
}

export default TrainingView;