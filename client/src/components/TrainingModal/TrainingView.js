import React from 'react';
import './TrainingModal.css';

const TrainingView = ({training}) => {
    return (
        <ul className="list-group">
            <li className="list-group-item">Date: {training.date}</li>
            <li className="list-group-item">Type: {training.mode}</li>
            <li className="list-group-item">Duration: {training.duration} minutes</li>
            <li className="list-group-item">Intensity: {training.intensity}</li>
            <li className="list-group-item">Feeling: {training.feeling}</li>
            <li className="list-group-item">Comments: {training.comments}</li>
        </ul>
    )
}

export default TrainingView;