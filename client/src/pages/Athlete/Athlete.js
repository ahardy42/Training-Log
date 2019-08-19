import React from 'react';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import Stats from '../../containers/Stats/Stats';
import TrainingModal from '../../containers/TrainingModal/TrainingModal';
import API from '../../utils/API';
import dateHelpers from '../../utils/dateHelpers';
import './Athlete.sass';

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
        let {calObject} = this.state;
        API.addTraining(training).then(training => {
            let updatedCalObject = training ? dateHelpers.insertTrainingIntoCalObject(training, calObject) : calObject;
            this.setState({
                calObject: updatedCalObject
            }, () => {
                this.getStats(this.state.calObject);
            });
        })
        .catch(err => console.log(err));
    }
    deleteTraining = id => {
        // will hit API to delete training and then update the calObject with new training
        let {calObject} = this.state;
        API.deleteTraining(id).then(training => {
            let updatedCalObject = training ? dateHelpers.insertTrainingIntoCalObject(training, calObject) : calObject;
            this.setState({
                calObject: updatedCalObject
            }, () => {
                this.getStats(this.state.calObject);
            });
        })
        .catch(err => console.log(err));
    }
    updateTraining = (training, id) => {
        // will hit API to update training and then update the calObject with new training
        let {calObject} = this.state;
        API.editTraining(training, id).then(training => {
            let updatedCalObject = training ? dateHelpers.insertTrainingIntoCalObject(training, calObject) : calObject;
            this.setState({
                calObject: updatedCalObject
            }, () => {
                this.getStats(this.state.calObject);
            });
        })
        .catch(err => console.log(err));
    }
    forwardInTimeframe = () => {
        // go forward one full timeframe unit, then populate the object with training from the DB
        let {calObject} = this.state;
        let forwardCalObject = dateHelpers.nextMonth(calObject);
        this.updateTrainingAndStats(forwardCalObject);
    }
    backwardInTimeframe = () => {
        // go backward one full timeframe unit
        let {calObject} = this.state;
        let backwardCalObject = dateHelpers.prevMonth(calObject);
        this.updateTrainingAndStats(backwardCalObject);
    }
    currentTimeframe = () => {
        let currentCalObject = dateHelpers.initialize();
        this.updateTrainingAndStats(currentCalObject);
    }
    componentDidMount = () => {
        // get training within the current timeframe and add it to the days that it happened (in the calObject)
        let {calObject} = this.state;
        this.updateTrainingAndStats(calObject);
    }
    getStats = (year, monthNum) => {
        API.getTrainingStats(year, monthNum)
        .then(stats => {
            this.setState({trainingStats: stats});
        })
        .catch(err => console.log(err));
    }
    updateTrainingAndStats = (calObject) => {
        let {year, monthNum} = calObject;
        this.getStats(year, monthNum);
        API.getTraining(year, monthNum)
        .then(training => {
            let updatedCalObject = training ? dateHelpers.insertTrainingIntoCalObject(training, calObject) : calObject;
            this.setState({
                calObject: updatedCalObject
            });
        })
        .catch(err => console.log(err));
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
                <div className="row justify-content-center">
                    {/* buttons to toggle view / add training */}
                    <div className="col-md-4 d-flex justify-content-center add-training-div">
                        <Button extraClasses="add-button" action="button" handleClick={this.openTrainingAddModal}>Add Training</Button>
                    </div>
                </div>
                <div className="row">
                    {/* calendar and stats */}
                    <div className="col-md-7 col-12 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <Calendar
                                    display={this.state.display}
                                    viewTraining={this.openTrainingViewModal}
                                    nextMonth={this.forwardInTimeframe}
                                    previousMonth={this.backwardInTimeframe}
                                    todaysDate={this.currentTimeframe}
                                    calObject={this.state.calObject}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-12">
                        <div className="card">
                            <div className="card-body">
                                <Stats userTraining={this.state.trainingStats}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Athlete;