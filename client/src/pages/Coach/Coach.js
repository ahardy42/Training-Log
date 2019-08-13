import React from 'react';
import AthleteList from '../../components/AthleteList/AthleteList';
import dateHelpers from '../../utils/dateHelpers';
import API from '../../utils/API';
import CalendarModal from '../../containers/CalendarModal/CalendarModal';


class Coach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            athletes: [],
            modalStyle: {display: "none"},
            selectedAthleteId: "",
            calObject: dateHelpers.initialize()
        }
    }
    openCalendarModal = id => {
        // handler to open the calendar modal on the page
        this.setState({
            modalStyle: {display: "block"},
            selectedAthleteId: id
        }, () => {
            let {monthNum, year} = this.state.calObject;
            this.getAthleteTraining(monthNum, year, this.state.calObject);
        });
    }
    closeCalendarModal = () => {
        this.setState({
            modalStyle: {display: "none"},
            selectedAthleteId: "",
            calObject: dateHelpers.initialize()
        });
    }
    forwardInTimeframe = () => {
        // go forward one full timeframe unit, then populate the object with training from the DB
        let {calObject} = this.state;
        let forwardCalObject = dateHelpers.nextMonth(calObject);
        let {year, monthNum} = forwardCalObject;
        // API call to get athlete training info goes here, as well as to set state
        this.getAthleteTraining(monthNum, year, forwardCalObject);
    }
    backwardInTimeframe = () => {
        // go backward one full timeframe unit
        let {calObject} = this.state;
        let backwardCalObject = dateHelpers.prevMonth(calObject);
        let {year, monthNum} = backwardCalObject;
        // API call to get athlete training info goes here
        this.getAthleteTraining(monthNum, year, backwardCalObject);
    }
    currentTimeframe = () => {
        let currentCalObject = dateHelpers.initialize();
        let {monthNum, year} = currentCalObject;
        // API call to get athlete training info goes here
        this.getAthleteTraining(monthNum, year, currentCalObject);
    }
    getAthleteTraining = (monthNum, year, calObject) => {
        let {selectedAthleteId} = this.state;
        API.specificAthleteTraining(year, monthNum, selectedAthleteId)
        .then(training => {
            console.log(training);
            let updatedCalObject = training ? dateHelpers.insertTrainingIntoCalObject(training, calObject) : calObject;
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => console.log(err)); 
    }
    componentDidMount = () => {
        let year = new Date().getFullYear();
        API.findAthletes(year)
        .then(teamArray => {
            this.setState({
                athletes: teamArray
            });
        });
    }
    render = () => {
        return(
            <div className="container mt-4">
                <CalendarModal
                    style={this.state.modalStyle}
                    calObject={this.state.calObject}
                    previousMonth={this.backwardInTimeframe}
                    nextMonth={this.forwardInTimeframe}
                    todaysDate={this.currentTimeframe}
                    closeCalendarModal={this.closeCalendarModal}
                />
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            {this.state.athletes.map(athlete => {
                                return <AthleteList key={athlete._id} athlete={athlete} handleClick={this.openCalendarModal}/>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Coach;