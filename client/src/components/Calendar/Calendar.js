import React from 'react';
import ToolBar from './ToolBar';
import Header from './Header';
import Week from './Week';
import './Calendar.css';

const Calendar = ({timeFrame, currDay, calObject, previousMonth, nextMonth, todaysDate}) => {
    return (
        <div className="wrapper">
            <ToolBar month={calObject.month} year={calObject.year} timeFrame={timeFrame} previousMonth={previousMonth} nextMonth={nextMonth} todaysDate={todaysDate}/>
            <div className="calendar">
                <Header weekArray={calObject.weekdays}/>
                {calObject.calendar.map(week => {
                    return <Week week={week} currDay={currDay}/>
                })}
            </div>
        </div>
    );
}

export default Calendar;