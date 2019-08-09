import React from 'react';
import Button from '../../components/Button/Button';
import TrainingForm from './TrainingForm';
import TrainingView from './TrainingView';
import Pagination from './Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class TrainingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainingPage: 0,
            date: null,
            duration: 0,
            mode: "",
            intensity: 0,
            feeling: 0,
            comment: "",
            coachComment: "",
            id: ""
        }
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
        this.setState({
            date: date,
            duration: duration,
            mode: mode,
            intensity: intensity,
            feeling: feeling,
            comment: comment,
            id: _id
        });
        // change the parent state to isAdd === true
        this.props.switchToEdit();
    }
    handleInputChange = (event) => {
        // input handler for form version of modal!
        event.preventDefault();
        let {name, value} = event.target;
        let parsedValue = Boolean(parseInt(value)) ? parseInt(value) : value; // return numbers where I need to
        this.setState({
            [name]: parsedValue
        });
    }
    handleCheck = (event) => {
        const {name, id} = event.target;
        this.setState({
            [name]: id
        });
    }
    handleChange = (date) => {
        this.setState({
            date: date.valueOf() // sets the unix time!
        });
    }
    handleAdd = (event) => {
        let {date, duration, mode, intensity, feeling, comment} = this.state;
        let training = {
            date: date,
            duration: duration,
            mode: mode,
            intensity: intensity,
            feeling: feeling,
            comment: comment
        }
        this.props.addTraining(training);
        this.modalCloseReset(event);
    }
    modalCloseReset = (event) => {
        this.props.handleClose(event);
        this.setState({
            date: new Date(),
            duration: 0,
            mode: "",
            intensity: 0,
            feeling: 0,
            comment: "",
            coachComment: ""
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
                            <Button action="button" handleClick={this.modalCloseReset}>
                                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <div className="modal-body">
                            {
                                training.length > 1 ? (
                                    <Pagination length={training.length} page={this.state.trainingPage} previousPage={this.previousPage} nextPage={this.nextPage} />
                                ) : null
                            }
                            {
                                isAdd ? (
                                    <TrainingForm
                                        state={this.state}
                                        selectedDate={this.state.date}
                                        handleInputChange={this.handleInputChange}
                                        handleChange={this.handleChange}
                                        handleCheck={this.handleCheck}
                                        handleSelect={this.handleSelect}
                                    />
                                ) : (
                                        <TrainingView
                                            trainingArray={training}
                                            index={this.state.trainingPage}
                                        />
                                    )
                            }
                        </div>
                        <div className="modal-footer">
                            <Button action="button" handleClick={this.modalCloseReset}>Close</Button>
                            {isAdd ?
                                (<Button action="button" handleClick={this.handleAdd}>Add Training</Button>) 
                                :
                            isEdit ? 
                                (
                                <>
                                    <Button action="button" handleClick={this.handleAdd}>Submit Updated Training</Button>
                                    <Button action="button" handleClick={this.handleAdd}>Delete Training</Button>
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