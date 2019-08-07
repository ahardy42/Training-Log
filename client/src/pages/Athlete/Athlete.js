import React from 'react';
import Button from '../../components/Button/Button';
import CalendarDiv from '../../containers/CalendarDiv/CalendarDiv';
import Stats from '../../components/Stats/Stats';
import TrainingModal from '../../components/TrainingModal/TrainingModal';
import API from '../../utils/API';
import dateHelpers from '../../utils/dateHelpers';

class Athlete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStyle: {display: "none"},
            isAddTraining: false,
            calObject: dateHelpers.initialize(), // calObject stores calendar info as well as training
            selectedTraining: [],
            trainingStats: []
        }
    }
    openModal = () => {
        let style = {
            display: "block"
        }
        this.setState({
            modalStyle: style
        });
    }
    closeModal = () => {
        let style = {
            display: "none"
        }
        this.setState({
            modalStyle: style
        });
    }
    addTraining = () => {
        // will hit API to add training

    }
    deleteTraining = () => {
        // will hit API to delete training
    }
    updateTraining = () => {
        // will hit API to update training
    }
    viewTraining = () => {
        // onclick handler for buttons to view training in modal
    }
    changeTimeframe = () => {
        // change from week to month
    }
    forwardInTimeframe = () => {
        // go forward one full timeframe unit
    }
    backwardInTimeframe = () => {
        // go backward one full timeframe unit
        
    }
    displayCurrentTimeSpan = () => {
        
    }
    componentDidMount = () => {
        // get training within the current timeframe and add it to the days that it happened (in the calObject)
        let {calObject} = this.state;
        let startTime = calObject.startUnix;
        let endTime = calObject.endUnix;
        API.getTraining(startTime, endTime)
        .then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, calObject);
            console.log(updatedCalObject);
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        })
        
    }
    render() {
        return (
            <div className="container">
                <TrainingModal style={this.state.modalStyle} handleClose={this.closeModal} isAdd={this.state.isAddTraining} training={this.state.selectedTraining}/>
                <div className="row">
                    {/* buttons to toggle view / add training */}
                    <div className="col justify-content-center">
                        <Button action="button" handleClick={this.openModal}>Add Training</Button>
                    </div>
                </div>
                <div className="row">
                    {/* calendar and stats */}
                    <div className="col-7">
                        <CalendarDiv 
                            display={this.state.display}
                            viewTraining={this.viewTraining}
                            nextMonth={this.forwardInTimeframe}
                            lastMonth={this.backwardInTimeframe}
                            todaysDate={this.displayCurrentTimeFrame}
                            calObject={this.state.calObject}
                        />
                    </div>
                    <div className="col-5">
                        <Stats userTraining={this.state.trainingStats}/>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Athlete;