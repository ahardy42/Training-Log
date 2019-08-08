import React from 'react';
import './Calendar.css';

const Header = (props) => {
    return (
        <div className="calendar__header">
            {props.weekArray.map((weekDay, index) => {
                return <div key={index}>{weekDay}</div>
            })}
        </div>
    );
}

export default Header;