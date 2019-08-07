import React from 'react';
import './TrainingModal.css';

const TrainingView = ({trainingArray}) => {
    return (
        <ul className="list-group">
            {trainingArray.map(training => {
                return (
                    <>
                        <li className="list-group-item">Date: {training.reformattedDate}</li>
                        <li className="list-group-item">Type: {training.mode}</li>
                        <li className="list-group-item">Duration: {training.duration} minutes</li>
                        <li className="list-group-item">Intensity: {training.intensity}</li>
                        <li className="list-group-item">Feeling: {training.feeling}</li>
                        <li className="list-group-item">Comments: {training.comment}</li>
                    </>
                );
            })}
        </ul>
    )
}

export default TrainingView;