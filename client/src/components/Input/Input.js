import React from 'react';

const Input = ({action, id, children, handleInputChange, ...props}) => {
    if (action === "select") {
        return (
            <div className="form-group">
                <label fo={id}>{children}</label>
                <select className="form-control" id={id}>
                    <option>unattached</option>
                    <option>SNSC</option>
                </select>
            </div>
        );
    } else if (action === "checkbox") {
        return (
            <div className="form-check">
                <input className="form-check-input" name={props.name} id={id} type={action} value={props.isChecked}/>
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