import React from 'react';
import Day from './Day';
import './Calendar.sass';

const Week = ({week, viewTraining}) => {
    return (
        <div className="calendar__week">
            {week.map(day => {
                return (
                    <Day
                        handleClick={viewTraining}
                        customDate={day.customDate}
                        isToday={day.isToday}
                        isInPrimaryMonth={day.isInPrimaryMonth}
                        day={day.day} 
                        date={day.date}
                        key={day.day}
                        training={day.training}
                    />
                )
            })}
        </div>
    );
}

export default Week;