import React from 'react';
import './TrainingModal.css';
import Input from '../Input/Input';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TrainingForm = ({ handleInputChange }) => {
    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <DatePicker onChange={handleInputChange} />
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="number" id="time" handleInputChange={handleInputChange}>Enter Time (minutes)</Input>
                </div>
                <div className="col">
                    <Input action="range" id="feeling" handleInputChange={handleInputChange}>How'd you feel?</Input>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="range" id="intensity" handleInputChange={handleInputChange}>How hard did you go?</Input>
                </div>
                <div className="col">
                    <div className="form-row">
                        <div className="col">
                            <Input action="radio" id="run" handleInputChange={handleInputChange}>run</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="run" handleInputChange={handleInputChange}>bike</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="run" handleInputChange={handleInputChange}>ski</Input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <Input action="radio" id="run" handleInputChange={handleInputChange}>rollerski</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="run" handleInputChange={handleInputChange}>swim</Input>
                        </div>
                        <div className="col">
                            <Input action="radio" id="run" handleInputChange={handleInputChange}>other</Input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <Input action="textarea" id="comment" handleInputChange={handleInputChange}>Any general comments?</Input>
                </div>
            </div>
        </form>
    )
}

export default TrainingForm;