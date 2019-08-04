import React from 'react';
import Training from '../Training/Training';
import "./Calendar.css";

const Day = ({isActive, day, training}) => {
    return (
        <div className={`calendar__day day ${isActive ? "active" : null}`}>
            <p className="day-p">{day}</p>
            <ul className="list-group">
                {training.map(activity => {
                    return <Training activity={activity.mode} key={activity._id} />
                })}
            </ul>
        </div>
    )
}

export default Day;