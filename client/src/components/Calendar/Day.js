import React from 'react';
import Training from '../Training/Training';
import "./Calendar.css";

const Day = ({isActive, day, hasTraining}) => {
    // style the day div based on whether there is training for the day. this is a good start...
    // perhaps in the future this will render a button styled to fit the contents of the div...
    let style = {
        backgroundColor: hasTraining ? "green" : null
    }
    return (
        <div className={`calendar__day day ${isActive ? "active" : null}`} style={style}>
            <p className="day-p">{day}</p>
        </div>
    )
}

export default Day;