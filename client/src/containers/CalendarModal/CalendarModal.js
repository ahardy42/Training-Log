import React from 'react';
import dateHelpers from '../../utils/dateHelpers';
import API from '../../utils/API';
import Calendar from '../../components/Calendar/Calendar';
import Training from '../../components/Training/Training';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './CalendarModal.css';

class CalendarModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachComment: "",
            trainingInView: null
        }
    }
    viewTraining = (event, training) => {
        this.setState({
            trainingInView: training
        });
    }
    closeModal = () => {
        this.setState({
            coachComment: "",
            trainingInView: null
        }, () => {
            this.props.closeCalendarModal();
        })
    }
    handleClick = (event, athleteId, trainingId) => {
        let comment = {
            coachComment: this.state.coachComment
        };
        API.addComment(athleteId, trainingId, comment)
        .then(training => {
            let {trainingInView} = this.state;
            let updatedTrainingInView = trainingInView.map(element => {
                if (element._id === training._id) {
                    return training;
                }
            });
            this.setState({
                trainingInView: updatedTrainingInView
            });
        });
    }
    handleInputChange = event => {
        let {name, value} = event.target;
        this.setState({
            [name] : value
        });
    }
    render() {
        return(
            <div className="modal" style={this.props.style} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Training</h5>
                            <Button action="button" handleClick={this.closeModal}>
                                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <Calendar
                                        calObject={this.props.calObject}
                                        previousMonth={this.props.previousMonth}
                                        nextMonth={this.props.nextMonth}
                                        todaysDate={this.props.todaysDate}
                                        viewTraining={this.viewTraining}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {this.state.trainingInView ? <Training training={this.state.trainingInView} athleteId={this.props.athleteId} handleInputChange={this.handleInputChange} handleClick={this.handleClick}/> : null}
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <Button action="button" handleClick={this.closeModal}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarModal;