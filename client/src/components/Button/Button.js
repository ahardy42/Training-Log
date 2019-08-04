import React from 'react';

const Button = ({action, children, handleClick, ...props}) => {
    return(
        <button type={action} onClick={handleClick} id={props.id} className={`btn btn-outline-info ${props.isDisabled}`}>{children}</button>
    )
}

export default Button;