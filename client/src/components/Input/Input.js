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
            <div class="form-check">
                <input class="form-check-input" type={props.action} value=""/>
                <label class="form-check-label">
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