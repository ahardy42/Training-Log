import React from 'react';
import './TrainingModal.sass';
import Input from '../../components/Input/Input';
import PickerWrapper from "./PickerWrapper";
import "react-datepicker/dist/react-datepicker.css";

const TrainingForm = ({ handleInputChange, state, handleCheck, handleChange}) => {
    let {date, comment, duration, feeling, intensity, mode} = state;
    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <PickerWrapper
                        handleChange={handleChange}
                        currValue={date}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input
                        action="number"
                        id="duration"
                        name="duration"
                        value={duration}
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
                    <div className="form-row">
                        <div className="col">
                            <Input action="radio" id="run" name="mode" value="run" checked={mode === "run" ? true : false} handleCheck={handleCheck}>run</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="bike" name="mode" value="bike" checked={mode === "bike" ? true : false} handleCheck={handleCheck}>bike</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="ski" name="mode" value="ski" checked={mode === "ski" ? true : false} handleCheck={handleCheck}>ski</Input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <Input action="radio" id="rollerski" name="mode" value="rollerski" checked={mode === "rollerski" ? true : false} handleCheck={handleCheck}>rollerski</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="swim" name="mode" value="swim" checked={mode === "swim" ? true : false} handleCheck={handleCheck}>swim</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="other" name="mode" value="other" checked={mode === "other" ? true : false} handleCheck={handleCheck}>other</Input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="textarea" id="comment" name="comment" value={comment} handleInputChange={handleInputChange}>Any general comments?</Input>
                </div>
            </div>
        </form>
    )
}

export default TrainingForm;