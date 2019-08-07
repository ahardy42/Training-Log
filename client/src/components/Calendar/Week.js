import React from 'react';
import Day from './Day';
import './Calendar.css';

const Week = ({week}) => {
    return (
        <div className="calendar__week">
            {week.map(day => {
                return (
                    <Day
                        customDate={day.customDate}
                        isToday={day.isToday}
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