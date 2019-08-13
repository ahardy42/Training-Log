import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Training = ({training}) => {
    return(
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Activity</th>
                        <th scope="col">Time</th>
                        <th scope="col">Intensity</th>
                        <th scope="col">Feeling</th>
                        <th scope="col">Athlete Comment</th>
                        <th scope="col">Coach Comment</th>
                    </tr>
                </thead>
                <tbody>
                {training.map((activity, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <th>{activity.mode}</th>
                            <th>{activity.duration} min</th>
                            <th>{activity.intensity}</th>
                            <th>{activity.feeling}</th>
                            <th>{activity.comment}</th>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Training;