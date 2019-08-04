import React from 'react';
import Button from '../../components/Button/Button';
import CalendarDiv from '../../containers/CalendarDiv/CalendarDiv';
import Stats from '../../components/Stats/Stats';
import TrainingModal from '../../components/TrainingModal/TrainingModal';

class Athlete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleButton: "Graph",
            modalStyle: {display: "none"},
            isAddTraining: false
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
    render() {
        return (
            <div className="container">
                <TrainingModal style={this.state.modalStyle} handleClose={this.closeModal} isAdd={this.state.isAddTraining} training={this.props.athlete.training}/>
                <div className="row">
                    {/* buttons to toggle view / add training */}
                    <div className="col justify-content-center">
                        <Button action="button">{this.state.toggleButton}</Button>
                        <Button action="button" handleClick={this.openModal}>Add Training</Button>
                    </div>
                </div>
                <div className="row">
                    {/* calendar and stats */}
                    <div className="col-7">
                        <CalendarDiv userTraining={this.props.athlete.training}/>
                    </div>
                    <div className="col-5">
                        <Stats userTraining={this.props.athlete.training}/>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Athlete;