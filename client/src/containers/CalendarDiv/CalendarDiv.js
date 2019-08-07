import React from 'react';
import Calendar from '../../components/Calendar/Calendar';


const CalendarDiv = props => {
    return (
        <Calendar
            display={props.display}
            viewTraining={props.viewTraining}
            calObject={props.calObject}
            lastMonth={props.lastMonth}
            nextMonth={props.nextMonth}
            todaysDate={props.todaysDate}
        />
    )
}

export default CalendarDiv;