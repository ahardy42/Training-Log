import React from 'react';
import './TrainingModal.sass';
import Input from '../../components/Input/Input';
import PickerWrapper from "./PickerWrapper";
import colorFuncs from '../../utils/colorFuncs';
import "react-datepicker/dist/react-datepicker.css";

const TrainingForm = ({ handleInputChange, state, handleCheck, handleChange, invalidModeSelection, invalidDuration, checkTime, checkDate}) => {
    let {splitActivities, date, comment, hours, minutes, feeling, intensity, mode} = state;
    const intensitySyleGenerator = intensity => {
        return {
            backgroundColor : colorFuncs.intensityColor([{intensity : intensity}])
        }
    }
    const feelingStyleGenerator = feeling => {
        return {
            backgroundColor : colorFuncs.feelingColor([{feeling : feeling}])
        }
    }
    return (
        <form>
            <div className="form-row justify-content-center">
                <div className="col">
                    <PickerWrapper validationFunction={checkDate} handleChange={handleChange} currValue={date}/>
                </div>
            </div>
            <p className="text-center mt-1 modal-p">Enter a time:</p>
            <div className="form-row" id="time-row">
                <div className="col">
                    <Input
                        action="number"
                        id="hours"
                        name="hours"
                        value={hours}
                        validationFunction={checkTime}
                        handleInputChange={handleInputChange}
                        pattern="[0-9]*"
                    >
                        (hours)
                    </Input>
                </div>
                <div className="col">
                    <Input
                        action="number"
                        id="minutes"
                        name="minutes"
                        value={minutes}
                        validationFunction={checkTime}
                        handleInputChange={handleInputChange}
                        pattern="[0-9]*"
                    >
                        (minutes)
                    </Input>
                </div>
            </div>
            <p className="text-center mt-1 modal-p">Pick an Activity</p>
            <div className="form-row" id="activities-row">
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
            <div className="form-row">
                <div className="col">
                    <Input
                        style={intensitySyleGenerator(intensity)}
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
            </div>
            <div className="form-row">
                <div className="col">
                    <Input
                        style={feelingStyleGenerator(feeling)}
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