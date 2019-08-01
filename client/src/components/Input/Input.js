import React from 'react';

const Input = props => {
    if (props.action === "select") {
        return (
            <div className="form-group">
                <label>{props.usedFor}</label>
                <select className="form-control">
                    <option>unattached</option>
                    <option>SNSC</option>
                </select>
            </div>
        );
    } else if (props.action === "check") {
        return (
            <div className="form-check">
                <input className="form-check-input" type={props.action} value=""/>
                <label className="form-check-label">
                    {`Pick your ${props.usedFor}`}
                </label>
            </div>
        );
    } else {
        return (
            <div className="form-group">
                <label>{props.usedFor}</label>
                <input type={props.action} className="form-control" placeholder={`Enter ${props.usedFor}`} />
            </div>
        );
    }
}


export default Input;