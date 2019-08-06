// wrapper for a Day
import React from 'react';
import Day from '../../components/Calendar/Day';

class DayWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            hasTraining: false,
            trainingIds: []
        }
    }
    handleDayClick = () => {
        // will open a modal on the athlete page to display training...

    }
    componentWillReceiveProps(nextProps){
        // not sure 100% why i needed this... maybe because the CalendarDiv was rendering after this?
        if(nextProps.training !== this.props.training){
            // check to see if the training happened on this day...
            let todayTraining = nextProps.training.filter(element => {
                return element.date.slice(0,15) === nextProps.date.toDateString().slice(0,15);
            });
            if (todayTraining.length) {
                this.setState({
                    hasTraining: true,
                    trainingIds: todayTraining.map(training => training._id)
                });
            }
        }
    }
    render() {
        return (
            <Day
                hasTraining={this.state.hasTraining}
                isActive={this.state.isActive}
                date={this.props.date}
                day={this.props.day}
            />
        )
    }
}

export default DayWrapper;