import React from 'react';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import Stats from '../../components/Stats/Stats';
import TrainingModal from '../../containers/TrainingModal/TrainingModal';
import API from '../../utils/API';
import dateHelpers from '../../utils/dateHelpers';

class Athlete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStyle: {display: "none"},
            calObject: dateHelpers.initialize(), // calObject stores calendar info as well as training
            isAdd: false,
            isEdit: false,
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
    closeModal = (e) => {
        let style = { display: "none" }
        this.setState({
            modalStyle: style,
            isAdd: false,
            isEdit: false,
        });
    }
    openTrainingViewModal = (event, training) => {
        console.log(training);
        this.setState({
            selectedTraining: training
        }, () => {
            this.openModal();
        });
    }
    openTrainingAddModal = () => {
        this.setState({
            isAdd: true
        }, () => {
            this.openModal();
        });
    }
    switchToEdit = () => {
        this.setState({
            isEdit: true
        });
    }
    addTraining = training => {
        // will hit API to add training and then update the calObject with new training
        console.log(training);
        API.addTraining(training).then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, this.state.calObject);
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    deleteTraining = id => {
        // will hit API to delete training and then update the calObject with new training
        API.deleteTraining(id).then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, this.state.calObject);
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    updateTraining = (training, id) => {
        // will hit API to update training and then update the calObject with new training
        API.editTraining(training, id).then(training => {
            let updatedCalObject = dateHelpers.insertTrainingIntoCalObject(training, this.state.calObject);
            this.setState({
                trainingStats: training,
                calObject: updatedCalObject
            });
        })
        .catch(err => {
            console.log(err);
        });
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
                trainingStats: training,
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
                trainingStats: training,
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
                trainingStats: training,
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
                trainingStats: training,
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
                    switchToEdit={this.switchToEdit}
                    addTraining={this.addTraining}
                    deleteTraining={this.deleteTraining}
                    updateTraining={this.updateTraining}
                    style={this.state.modalStyle}
                    handleClose={this.closeModal}
                    handleClickOutsideModal={this.clickOutsideCloseModal}
                    isAdd={this.state.isAdd}
                    isEdit={this.state.isEdit}
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