import React from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './Calendar.css';

const ToolBar = ({ year, month, timeFrame, toggleTimeframe, previousMonth, nextMonth, todaysDate}) => {
    return (
        <div className="row">
            <div className="col-3">
                <Button action="button" handleClick={toggleTimeframe}>{timeFrame}</Button>
            </div>
            <div className="col-6">
                <div className="current-month">{month} {year}</div>
            </div>
            <div className="col-3">
                <Button action="button" handleClick={previousMonth}><FontAwesomeIcon icon={faAngleLeft}/></Button>
                <Button action="button" handleClick={todaysDate}><FontAwesomeIcon icon={faCalendarCheck}/></Button>
                <Button action="button" handleClick={nextMonth}><FontAwesomeIcon icon={faAngleRight}/></Button>
            </div>
        </div>
    );
}

export default ToolBar;