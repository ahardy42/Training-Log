import React from 'react';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './Calendar.sass';

const ToolBar = ({ year, month, previousMonth, nextMonth, todaysDate}) => {
    return (
        <div className="row align-items-center justify-content-between">
            <div className="col-6 mb-2">
                <div className="current-month">{month} {year}</div>
            </div>
            <div className="col-6 mb-2 d-flex justify-content-end">
                <Button extraClasses="no-outline-button" action="button" handleClick={previousMonth}><FontAwesomeIcon icon={faAngleLeft}/></Button>
                <Button extraClasses="no-outline-button" action="button" handleClick={todaysDate}><FontAwesomeIcon icon={faCalendarCheck}/></Button>
                <Button extraClasses="no-outline-button" action="button" handleClick={nextMonth}><FontAwesomeIcon icon={faAngleRight}/></Button>
            </div>
        </div>
    );
}

export default ToolBar;