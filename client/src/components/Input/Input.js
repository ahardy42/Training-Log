import React from 'react';
import './Input.sass';

const Input = ({action, id, children, handleInputChange, ...props}) => {
    const rangevalues = {
        min: action => action === "range" ? 0 : null,
        max: action => action === "range" ? 5 : null,
        step: action => action === "range" ? 1 : null
    }
    if (action === "select") {
        return (
            <div className="form-group">
                <label htmlFor={id}>{children}</label>
                <select className="form-control" value={props.value} name={props.name} id={id} onChange={handleInputChange}>
                    {props.teams.map(team => {
                        return <option key={team._id} id={team._id}>{team.name}</option>
                    })}
                </select>
            </div>
        );
    } else if (action === "checkbox"|| action === "radio") {
        return (
            <div className="form-check">
                <input className="form-check-input" value={props.value} checked={props.checked} name={props.name} id={id} type={action} onChange={props.handleCheck}/>
                <label className="form-check-label" htmlFor={id}>
                    {children}
                </label>
            </div>
        );
    } else {
        return (
            <div className={`form-group ${props.extraClasses || ""}`}>
                <label htmlFor={id}>{children}</label>
                <input
                    type={action}
                    className="form-control"
                    value={props.value}
                    name={props.name}
                    id={id}
                    min={rangevalues.min(action)}
                    max={rangevalues.max(action)}
                    step={rangevalues.step(action)}
                    placeholder={`Enter ${action}`}
                    onChange={handleInputChange}
                />
            </div>
        );
    }
}


export default Input;