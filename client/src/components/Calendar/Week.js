import React from 'react';
import DayWrapper from '../../containers/DayWrapper/DayWrapper';
import './Calendar.css';

const Week = ({week, training}) => {
    return (
        <div className="calendar__week">
            {week.map(day => {
                return (
                    <DayWrapper
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