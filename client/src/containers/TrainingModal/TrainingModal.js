import React from 'react';
import Button from '../../components/Button/Button';
import TrainingForm from './TrainingForm';
import TrainingView from './TrainingView';
import Pagination from './Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import API from '../../utils/API';
import './TrainingModal.sass';

class TrainingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainingPage: 0,
            splitActivities: [],
            coachComment: "",
            id: "",
            rangeStyle: {},
            hours: 0,
            minutes: 0,
            intensity: 3,
            feeling: 3,
            date: new Date(),
            comment: "",
            mode: "",
            invalidDuration: false,
            invalidModeSelection: false
        }
    }
    setDurationStateValue = (hours, minutes) => {
        let duration = 0;
        duration += hours*60;
        duration += minutes;
        return duration;
    }
    getDurationHoursMinutes = duration => {
        let hours = Math.floor(duration/60);
        let minutes = duration % 60;
        return {
            hours: hours,
            minutes: minutes
        }
    }
    checkTime = (time, val) => {
        if (typeof val !== "number") {
            this.setState({
                [time]: 0,
                invalidDuration: true
            });
        } else {
            this.setState({
                invalidDuration: false
            })
        }
    }
    checkDate = () => {
        this.setState(prevState => {
            if (prevState.date === null) { // nothing entered
                return {date: new Date()}
            } else if (!Date.parse(prevState.date)) { // does not evaluate to a date string
                return {date: new Date()}
            } else {
                return;
            }
        });
    }
    nextPage = () => {
        this.setState(prevState => {
            let updatedPage = prevState.trainingPage === this.props.training.length -1 ? 0 : prevState.trainingPage + 1;
            return {trainingPage: updatedPage}
        });
    }
    previousPage = () => {
        this.setState(prevState => {
            let updatedPage = prevState.trainingPage === 0 ? this.props.training.length -1 : prevState.trainingPage - 1;
            return {trainingPage: updatedPage}
        });
    }
    handleEditClick = () => {
        // set state to the current training values
        let {training} = this.props;
        let {trainingPage} = this.state;
        let {date, duration, mode, intensity, feeling, comment, _id} = training[trainingPage];
        let durationObject = this.getDurationHoursMinutes(duration);
        this.setState({
            date: date,
            hours: durationObject.hours,
            minutes: durationObject.minutes,
            mode: mode,
            intensity: intensity,
            feeling: feeling,
            comment: comment,
            id: _id
        });
        // change the parent state to isAdd === true
        this.props.switchToEdit();
    }
    handleInputChange = (event, validationFunction) => {
        // input handler for form version of modal!
        event.preventDefault();
        let {name, value} = event.target;
        let parsedValue = Boolean(parseInt(value)) ? Math.abs(parseInt(value)) : value; // return numbers where I need to
        this.setState({
            [name]: parsedValue
        }, () => {
            if (validationFunction) {
                if (name === "hours" || name === "minutes") {
                    validationFunction(name, parsedValue);
                } else {
                    validationFunction();
                }
            } else {
                return;
            }
        });
    }
    handleCheck = (event) => {
        const {name, id} = event.target;
        this.setState({
            [name]: id,
            invalidModeSelection: false
        });
    }
    handleChange = (date, validationFunction) => {
        this.setState({
            date: date 
        }, () => {
            validationFunction();
        });
    }
    handleAdd = (event) => {
        let {invalidDuration, invalidModeSelection} = this.state;
        let training = this.createTrainingObject();
        let {duration, mode, date} = training;
        if (invalidDuration || Number.isNaN(duration)) {
            this.setState({
                invalidDuration : true
            });
            return;
        } else if (mode === "" || invalidModeSelection) {
            this.setState({
                invalidModeSelection : true
            });
            return;
        } else if (date === null || !Date.parse(date)) {
            this.setState({
                date : new Date()
            });
            return;
        } else {
            this.props.addTraining(training);
            this.modalCloseReset(event);
        }
    }
    handleEdit = (event) => {
        let {id, hours, minutes} = this.state;
        this.setState({
            duration: this.setDurationStateValue(hours, minutes)
        }, () => {
            let training = this.createTrainingObject();
            this.props.updateTraining(training, id);
            this.modalCloseReset(event);
        })
    }
    handleDelete = (event) => {
        let {id} = this.state;
        this.props.deleteTraining(id);
        this.modalCloseReset(event);
    }
    modalCloseReset = (event) => {
        this.props.handleClose(event);
        this.setState({
            date: new Date(),
            trainingPage: 0,
            hours: 0,
            minutes: 0,
            mode: "",
            intensity: 3,
            feeling: 3,
            comment: "",
            coachComment: ""
        });
    }
    createTrainingObject = () => {
        let {date, hours, minutes, mode, intensity, feeling, comment} = this.state;
        return {
            date: date,
            duration: this.setDurationStateValue(hours, minutes),
            mode: mode,
            intensity: intensity,
            feeling: feeling,
            comment: comment
        };
    }
    componentDidMount = () => {
        API.getTeamSpecificInfo(this.props.teamName)
        .then(teamObject => {
            let {activities} = teamObject;
            let chunk = _.chunk(activities, 3);
            this.setState({
                splitActivities: chunk
            });
        });
    }
    render() {
        let {style, training, isAdd, isEdit} = this.props;
        return (
            <div className="modal" style={style} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isAdd ? "Add Training" : "Here's your training!"}</h5>
                            <Button action="button" handleClick={this.modalCloseReset} extraClasses="no-outline-button">
                                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <div className="modal-body">
                            {
                                (training.length > 1 && !isEdit) ? (
                                    <Pagination length={training.length} page={this.state.trainingPage} previousPage={this.previousPage} nextPage={this.nextPage} />
                                ) : null
                            }
                            {
                                (isAdd || isEdit) ? (
                                    <TrainingForm
                                        invalidDuration={this.state.invalidDuration}
                                        invalidModeSelection={this.state.invalidModeSelection}
                                        checkDate={this.checkDate}
                                        checkTime={this.checkTime}
                                        checkModeSelection={this.checkModeSelection}
                                        rangeStyle={this.rangeStyle}
                                        state={this.state}
                                        selectedDate={this.state.date}
                                        handleInputChange={this.handleInputChange}
                                        handleChange={this.handleChange}
                                        handleCheck={this.handleCheck}
                                        handleSelect={this.handleSelect}
                                        splitActivities={this.state.splitActivities}
                                    />
                                ) : (
                                        <TrainingView
                                            nextPage={this.nextPage}
                                            previousPage={this.previousPage}
                                            trainingArray={training}
                                            index={this.state.trainingPage}
                                        />
                                    )
                            }
                        </div>
                        <div className="modal-footer training-modal-footer">
                            {isAdd ?
                                (<Button action="button" handleClick={this.handleAdd}>Add Training</Button>) 
                                :
                            isEdit ? 
                                (
                                <>
                                    <Button action="button" handleClick={this.handleEdit}>Submit Updated Training</Button>
                                    <Button action="button" handleClick={this.handleDelete}>Delete Training</Button>
                                </>
                                ) 
                                :
                                (<Button action="button" handleClick={this.handleEditClick}>Edit Training</Button>)}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default TrainingModal;
