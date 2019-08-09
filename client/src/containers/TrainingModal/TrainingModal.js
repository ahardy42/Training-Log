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
            coachComment: ""
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
        console.log(training);
        this.props.addTraining(training);
        this.modalCloseReset(event);
    }
    modalCloseReset = (event) => {
        // reset state when you close the modal (you changed your mind)
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
        let {style, training, isAdd, deleteTraining, updateTraining, handleClickOutsideModal} = this.props;
        return (
            <div className="modal" style={style} tabIndex="-1" role="dialog" onClick={handleClickOutsideModal}>
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
                                        selectedDate={this.state.date}
                                        trainingArray={training}
                                        index={this.state.trainingPage}
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
                                (<Button action="button" handleClick={this.handleAdd}>Add Training</Button>) :
                                (<Button action="button" handleClick={this.handleEditClick}>Edit Training</Button>)}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default TrainingModal;