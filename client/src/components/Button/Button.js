import React from 'react';

const Button = (props) => {
    return(
        <button type={props.action} className="btn btn-success">{props.action}</button>
    )
}

export default Button;