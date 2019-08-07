import React from 'react';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import Stats from '../../components/Stats/Stats';
import TrainingModal from '../../components/TrainingModal/TrainingModal';
import API from '../../utils/API';
import dateHelpers from '../../utils/dateHelpers';

class Athlete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStyle: {display: "none"},
            calObject: dateHelpers.initialize(), // calObject stores calendar info as well as training
            isAdd: false,
            selectedTraining: [],
            trainingStats: []
        }
    }
    openModal = () => {
        let style = {display: "block"}
        this.setState({
            modalStyle: style
        });
    }
    closeModal = () => {
        let style = {display: "none"}
        this.setState({
            modalStyle: style,
            isAdd: false
        });
    }
    openTrainingViewModal = (event, training) => {
        console.log(training);
        // this.setState({
        //     selectedTraining: trainingArray
        // }, () => {
        //     this.openModal();
        // });
    }
    openTrainingAddModal = () => {
        this.setState({
            isAdd: true
        }, () => {
            this.openModal();
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
    forwardInTimeframe = () => {
        // go forward one full timeframe unit, then populate the object with training from the DB
        let {calObject} = this.state;
        let forwardCalObject = dateHelpers.nextMonth(calObject);
        console.log(forwardCalObject);
        API.getTraining(forwardCalObject.startUnix, forwardCalObject.endUnix)
        .then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, forwardCalObject);
            console.log(updatedCalObject);
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    backwardInTimeframe = () => {
        // go backward one full timeframe unit
        let {calObject} = this.state;
        let backwardCalObject = dateHelpers.prevMonth(calObject);
        API.getTraining(backwardCalObject.startUnix, backwardCalObject.endUnix)
        .then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, backwardCalObject);
            console.log(updatedCalObject);
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    currentTimeframe = () => {
        let currentCalObject = dateHelpers.initialize();
        API.getTraining(currentCalObject.startUnix, currentCalObject.endUnix)
        .then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, currentCalObject);
            console.log(updatedCalObject);
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        })
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
                <TrainingModal
                    style={this.state.modalStyle}
                    handleClose={this.closeModal}
                    isAdd={this.state.isAddTraining}
                    training={this.state.selectedTraining}
                />
                <div className="row">
                    {/* buttons to toggle view / add training */}
                    <div className="col justify-content-center">
                        <Button action="button" handleClick={this.openTrainingAddModal}>Add Training</Button>
                    </div>
                </div>
                <div className="row">
                    {/* calendar and stats */}
                    <div className="col-7">
                        <Calendar
                            display={this.state.display}
                            viewTraining={this.openTrainingViewModal}
                            nextMonth={this.forwardInTimeframe}
                            previousMonth={this.backwardInTimeframe}
                            todaysDate={this.currentTimeframe}
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