import React from 'react';
import TrainingInfo from './TrainingInfo';
import colorFuncs from '../../utils/colorFuncs';
import "./Calendar.sass";


const Day = ({isToday, day, training, handleClick}) => {
    // style the day div based on whether there is training for the day. this is a good start...
    // perhaps in the future this will render a button styled to fit the contents of the div...
    let style = {
        backgroundImage: `${colorFuncs.gradientColorCss(colorFuncs.trainingColor(training), "to bottom right", "75%")}`
    }
    return (
        <div style={style} className={`calendar__day day ${isToday ? "active" : ""} ${training.length ? "training" : ""}`} onClick={training.length ? (event) => handleClick(event, training) : null}>
            <p className="day-p">{day}</p>
            {training.length ? <TrainingInfo training={training} /> : null}
        </div>
    )
}

export default Day;