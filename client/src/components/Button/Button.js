import React from 'react';

const Button = (props) => {
    return(
        <button type={props.action} class="btn btn-success">{props.action}</button>
    )
}

export default Button;