import React from 'react';
import DayWrapper from '../../containers/DayWrapper/DayWrapper';
import './Calendar.css';

const Week = ({week, training}) => {
    return (
        <div className="calendar__week">
            {week.map(day => {
                return (
                    <DayWrapper
                        isActive={day.date.toDateString().slice(0, 10) === new Date().toDateString().slice(0, 10) ? true : false}
                        day={day.day} 
                        date={day.date}
                        key={day.day}
                        training={training}
                    />
                )
            })}
        </div>
    );
}

export default Week;