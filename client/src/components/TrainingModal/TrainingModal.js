import React from 'react';
import Button from '../Button/Button';
import TrainingForm from './TrainingForm';
import TrainingView from './TrainingView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const TrainingModal = (props) => {
    return (
        <div className="modal" style={props.style} tabIndex="-1" role="dialog" onClick={props.handleClose}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <Button action="button" handleClick={props.handleClose}>
                            <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                        </Button>
                    </div>
                    <div className="modal-body">
                        {props.isAdd ? <TrainingForm training={props.training}/> : <TrainingView trainingArray={props.training}/>}
                    </div>
                    <div className="modal-footer">
                        <Button action="button" handleClick={props.handleClose}>Close</Button>
                        <Button action="button" handleClick={props.addTraining}>{props.isAdd ? "Add Training" : "Edit Training"}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainingModal;