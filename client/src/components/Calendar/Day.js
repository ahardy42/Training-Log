import React from 'react';
// import Training from '../Training/Training';
import "./Calendar.css";

const Day = ({isToday, day, training, handleClick}) => {
    // style the day div based on whether there is training for the day. this is a good start...
    // perhaps in the future this will render a button styled to fit the contents of the div...
    return (
        <div className={`calendar__day day ${isToday ? "active" : ""} ${training.length ? "training" : ""}`} onClick={training.length ? (event) => handleClick(event, training) : null}>
            <p className="day-p">{day}</p>
        </div>
    )
}

export default Day;