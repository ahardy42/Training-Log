import React from 'react';
import './Input.sass';

const Input = ({action, id, children, handleInputChange, validationFunction, ...props}) => {
    if (action === "select") {
        return (
            <div className="form-group">
                <label htmlFor={id}>{children}</label>
                <select className="form-control" value={props.value} name={props.name} id={id} onChange={handleInputChange}>
                    {props.teams ? props.teams.map(team => {
                        return <option key={team._id} id={team._id}>{team.name}</option>
                    }) : <option>Loading Teams...</option>}
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
    } else if (action === "textarea") {
        return (
            <div className={`form-group ${props.extraClasses || ""}`}>
                <label htmlFor={id}>{children}</label>
                <textarea 
                    className="form-control"
                    value={props.value}
                    name={props.name}
                    id={id}
                    placeholder="enter comment"
                    onChange={handleInputChange}
                />
            </div>
        )
    } else if (action === "range") {
        return (
            <div className={`form-group ${props.extraClasses || ""}`}>
                <label htmlFor={id}>{children}</label>
                <input
                    style={props.style ? props.style : null}
                    type={action}
                    pattern={props.pattern ? props.pattern : ""}
                    className="form-control"
                    value={props.value}
                    name={props.name}
                    id={id}
                    min="0"
                    max="5"
                    step="1"
                    onChange={(event) => handleInputChange(event, validationFunction)}
                />
                <div className="small-group">
                {/* small for information about slider */}
                <small id="left-small">{props.name === "intensity" ? "easy" : "felt horrible"}</small>
                <small id="val-small">{props.value}</small>
                <small id="right-small">{props.name === "intensity" ? "hard" : "felt great!"}</small>
                </div>
            </div>
        );
    } else {
        // differentiating between text and number inputs for value
        const returnValue = value => {
            if (typeof value === "number") {
                // better user experience not having to overwrite zeros
                return value > 0 ? value : ""; 
            }
            return value;
        }
        return(
            <div className={`form-group ${props.extraClasses || ""}`}>
                <label htmlFor={id}>{children}</label>
                <input
                    style={props.style ? props.style : null}
                    type={action}
                    pattern={props.pattern ? props.pattern : ""}
                    className="form-control"
                    value={returnValue(props.value)}
                    name={props.name}
                    id={id}
                    placeholder={`Enter ${action}`}
                    onChange={(event) => handleInputChange(event, validationFunction)}
                />
            </div>
        );
    }
}


export default Input;