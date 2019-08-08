import React from 'react';
import './TrainingModal.css';
import Input from '../../components/Input/Input';
import PickerWrapper from "./PickerWrapper";
import "react-datepicker/dist/react-datepicker.css";

const TrainingForm = ({ handleInputChange, index, trainingArray, handleCheck, handleChange}) => {
    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <PickerWrapper handleChange={handleChange}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="number" id="duration" name="duration" handleInputChange={handleInputChange}>Enter Time (minutes)</Input>
                </div>
                <div className="col">
                    <Input action="range" id="feeling" name="feeling" handleInputChange={handleInputChange}>How'd you feel?</Input>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="range" id="intensity" name="intensity" handleInputChange={handleInputChange}>How hard did you go?</Input>
                </div>
                <div className="col">
                    <div className="form-row">
                        <div className="col">
                            <Input action="radio" id="run" name="mode" value="run" handleCheck={handleCheck}>run</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="bike" name="mode" value="bike" handleCheck={handleCheck}>bike</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="ski" name="mode" value="ski" handleCheck={handleCheck}>ski</Input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <Input action="radio" id="rollerski" name="mode" value="rollerski" handleCheck={handleCheck}>rollerski</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="swim" name="mode" value="swim" handleCheck={handleCheck}>swim</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="other" name="mode" value="other" handleCheck={handleCheck}>other</Input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="textarea" id="comment" name="comment" handleInputChange={handleInputChange}>Any general comments?</Input>
                </div>
            </div>
        </form>
    )
}

export default TrainingForm;