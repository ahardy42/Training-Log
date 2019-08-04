import React from 'react';
import Button from '../Button/Button';

const Training = (props) => {
    return (
        <Button handleClick={props.handleClick}>{props.activity}</Button>
    )
}

export default Training;