import React from 'react';
import ToolBar from './ToolBar';
import Header from './Header';
import Week from './Week';
import './Calendar.css';

const Calendar = ({calObject, previousMonth, nextMonth, todaysDate}) => {

    return (
        <div className="wrapper">
            <ToolBar month={calObject.month} year={calObject.year} nextMonth={nextMonth} previousMonth={previousMonth} todaysDate={todaysDate}/>
            <div className="calendar">
                <Header weekArray={calObject.weekdaysAbbr}/>
                {calObject.calendar.map((week, index) => {
                    return <Week week={week} key={index}/>
                })}
            </div>
        </div>
    );
}

export default Calendar;