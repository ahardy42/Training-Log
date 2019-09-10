import React from 'react';
import TrainingInfo from './TrainingInfo';
import colorFuncs from '../../utils/colorFuncs';
import "./Calendar.sass";


const Day = ({isToday, isInPrimaryMonth, day, training, handleClick}) => {
    // style the day div based on whether there is training for the day. this is a good start...
    // perhaps in the future this will render a button styled to fit the contents of the div...
    let style = {
        backgroundImage: `${colorFuncs.gradientColorCss(colorFuncs.trainingColor(training), "to bottom right", "75%")}`
    }
    const coachCommentClass = training => {
        let isComment = false;
        training.forEach(training => {
            if (training.coachComment) {
                isComment = true;
            }
        });
        return isComment;
    }
    return (
        <div style={training.length ? style : null} className={`calendar__day day ${isToday ? "active" : ""} ${training.length ? "training" : ""}`} onClick={training.length ? (event) => handleClick(event, training) : null}>
            <p className={`day-p ${coachCommentClass(training) ? "comment" : ""} ${isInPrimaryMonth ? "primary" : ""}`}>{day}</p>
            {training.length ? <TrainingInfo training={training} /> : null}
        </div>
    )
}

export default Day;