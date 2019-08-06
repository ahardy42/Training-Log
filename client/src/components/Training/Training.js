import React from 'react';
import Button from '../Button/Button';

const Training = (props) => {
    return (
        <li className="list-group-item">
            <Button handleClick={props.handleClick}>{props.activity}</Button>
        </li>
    )
}

export default Training;