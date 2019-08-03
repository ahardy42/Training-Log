import React from 'react';
import './Calendar.css';

const ToolBar = ({week}) => {
    return (
        <div className="calendar__week">
            {week.map(day => {
                return <div className="calendar__day day">{day.day}</div>
            })}
        </div>
    );
}

export default ToolBar;

