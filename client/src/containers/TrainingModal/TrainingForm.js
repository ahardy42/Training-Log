import React from 'react';
import './TrainingModal.sass';
import Input from '../../components/Input/Input';
import PickerWrapper from "./PickerWrapper";
import "react-datepicker/dist/react-datepicker.css";

const TrainingForm = ({ handleInputChange, state, handleCheck, handleChange, invalidModeSelection, invalidDuration, checkDuration, checkDate}) => {
    let {splitActivities, date, comment, duration, feeling, intensity, mode} = state;
    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <PickerWrapper validationFunction={checkDate} handleChange={handleChange} currValue={date}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input
                        action="number"
                        id="duration"
                        name="duration"
                        value={duration}
                        validationFunction={checkDuration}
                        handleInputChange={handleInputChange}
                    >
                        Enter Time (minutes)
                    </Input>
                </div>
                <div className="col">
                    <Input
                        action="range"
                        id="feeling"
                        name="feeling"
                        value={feeling}
                        handleInputChange={handleInputChange}
                    >
                        How'd you feel?
                    </Input>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input
                        extraClasses="intensity-range"
                        action="range"
                        id="intensity"
                        name="intensity"
                        value={intensity}
                        handleInputChange={handleInputChange}
                    >
                        How hard did you go?
                    </Input>
                </div>
                <div className="col">
                    {splitActivities ? splitActivities.map((array, index) => {
                        return (
                            <div className="form-row" key={index}>
                                {array.length ? array.map(activityObject => {
                                    return (
                                        <div className="col" key={activityObject._id}>
                                            <Input
                                                action="radio"
                                                icon={activityObject.icon}
                                                id={activityObject.activityType}
                                                name="mode"
                                                value={activityObject.activityType}
                                                checked={mode === activityObject.activityType ? true : false}
                                                handleCheck={handleCheck}
                                            >
                                                {activityObject.activityType}
                                            </Input>
                                        </div>
                                    )
                                }) : null}
                            </div>
                        )
                    }) : null}
                </div>
            </div>
            {invalidModeSelection ? <p className="training-error">Please select a training mode!</p> : null}
            {invalidDuration ? <p className="training-error">Please enter a valid duration!</p> : null}
            <div className="form-row">
                <div className="col">
                    <Input action="textarea" id="comment" name="comment" value={comment} handleInputChange={handleInputChange}>Any general comments?</Input>
                </div>
            </div>
        </form>
    )
}

export default TrainingForm;