import React from 'react';

const Input = ({action, id, children, handleInputChange, ...props}) => {
    if (action === "select") {
        return (
            <div className="form-group">
                <label htmlFor={id}>{children}</label>
                <select className="form-control" name={props.name} id={id} onChange={handleInputChange}>
                    <option>unattached</option>
                    <option>SNSC</option>
                </select>
            </div>
        );
    } else if (action === "checkbox"|| action === "radio") {
        return (
            <div className="form-check">
                <input className="form-check-input" name={props.name} id={id} type={action} onChange={props.handleCheck}/>
                <label className="form-check-label" htmlFor={id}>
                    {children}
                </label>
            </div>
        );
    } else {
        return (
            <div className="form-group">
                <label htmlFor={id}>{children}</label>
                <input type={action} className="form-control" name={props.name} id={id} placeholder={`Enter ${action}`} onChange={handleInputChange}/>
            </div>
        );
    }
}


export default Input;