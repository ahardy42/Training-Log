import React from 'react';
import dateHelpers from '../../utils/dateHelpers';
import API from '../../utils/API';
import Calendar from '../../components/Calendar/Calendar';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './CalendarModal.css';

class CalendarModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calObject: dateHelpers.initialize()
        }
    }
    forwardInTimeframe = () => {
        // go forward one full timeframe unit, then populate the object with training from the DB
        let {calObject} = this.state;
        let forwardCalObject = dateHelpers.nextMonth(calObject);
        let {year, monthNum} = forwardCalObject;
        // API call to get athlete training info goes here
    }
    backwardInTimeframe = () => {
        // go backward one full timeframe unit
        let {calObject} = this.state;
        let backwardCalObject = dateHelpers.prevMonth(calObject);
        let {year, monthNum} = backwardCalObject;
        // API call to get athlete training info goes here
    }
    currentTimeframe = () => {
        let currentCalObject = dateHelpers.initialize();
        let {monthNum, year} = currentCalObject;
        // API call to get athlete training info goes here
    }
    componentDidMount = () => {
        let {id} = this.props;

    }
    render() {
        return(
            <div className="modal" style={this.props.style} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Training</h5>
                            <Button action="button" handleClick={this.modalCloseReset}>
                                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <div className="modal-body">
                            <Calendar
                                calObject={this.state.calObject}
                                previousMonth={this.backwardInTimeframe}
                                nextMonth={this.forwardInTimeframe}
                                todaysDate={this.currentTimeframe}
                                viewTraining={this.viewTraining}
                            />
                        </div>
                        <div className="modal-footer">
                            <Button action="button" handleClick={this.modalClose}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarModal;