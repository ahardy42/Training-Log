// wrapper for a Day
import React from 'react';
import Day from '../../components/Calendar/Day';

class DayWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            training: []
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
    componentWillReceiveProps(nextProps){
        // not sure 100% why i needed this... maybe because the CalendarDiv was rendering after this?
        console.log(nextProps);
        if(nextProps.training !== this.props.training){
            // check to see if the training happened on this day...
            let todayTraining = nextProps.training.filter(element => {
                return element.date.slice(0,15) === nextProps.date.toDateString().slice(0,15);
            });
            this.setState({
                training: todayTraining
            });
        }
    }
    render() {
        return (
            <Day
                training={this.state.training}
                isActive={this.state.isActive}
                date={this.props.date}
                day={this.props.day}
            />
        )
    }
}

export default DayWrapper;