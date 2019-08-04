// wrapper for a Day
import React from 'react';
import Day from '../../components/Calendar/Day';

class DayWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive,
            training: this.props.training
        }
    }
    handleTrainingClick = () => {
        // will open a modal
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
    displayTraining = () => {
        // will display any training for the current day
        // let {training, date} = this.props;
        // let todayTraining = training.filter(element => {
        //     return new Date(element.date).toDateString().filter(0,15) === date.toDateString().filter(0,15);
        // });
        
        // this.setState({
        //     todayTraining: todayTraining
        // })
    }
    componentDidMount() {
        console.log(this.props);
        // this.displayTraining();
    }
    render() {
        return (
            <Day
                isActive={this.state.isActive}
                date={this.props.date}
                day={this.props.day}
            />
        )
    }
}

export default DayWrapper;