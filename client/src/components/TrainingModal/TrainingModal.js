import React from 'react';
import Button from '../Button/Button';
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
    handleInputhange = () => {
        // input handler for form version of modal
    }
    render() {
        let {style, handleClose, training, isAdd, addTraining} = this.props;
        return (
            <div className="modal" style={style} tabIndex="-1" role="dialog" onClick={handleClose}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isAdd ? "Add Training" : "Here's your training!"}</h5>
                            <Button action="button" handleClick={handleClose}>
                                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <div className="modal-body">
                            {training.length > 1 ? <Pagination length={training.length} page={this.state.trainingPage} previousPage={this.previousPage} nextPage={this.nextPage}/> : null}
                            {isAdd ? <TrainingForm trainingArray={training} index={this.state.trainingPage}/> : <TrainingView trainingArray={training} index={this.state.trainingPage}/>}
                        </div>
                        <div className="modal-footer">
                            <Button action="button" handleClick={handleClose}>Close</Button>
                            <Button action="button" handleClick={addTraining}>{isAdd ? "Add Training" : "Edit Training"}</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default TrainingModal;