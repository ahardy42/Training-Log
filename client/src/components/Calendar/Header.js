import React from 'react';
import './Calendar.css';

const Header = ({weekArray}) => {
    return (
        <div className="calendar__header">
            {weekArray.map(weekDay => {
                return <div>{weekDay}</div>
            })}
        </div>
    );
}

export default Header;