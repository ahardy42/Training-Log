import React from 'react';

const Button = ({action, children, handleClick, ...props}) => {
    return(
        <button
            type={action}
            onClick={handleClick}
            id={props.id}
            className={`btn ${props.extraClasses ? props.extraClasses : "myButton"}`}
        >
            {children}
        </button>
    )
}

export default Button;