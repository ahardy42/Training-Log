import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Graph from '../../components/Graph/Graph';
import calendar from 'calendar-js';

class CalendarDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "calendar",
            timeFrame: "month",
            calObject: calendar().detailed(new Date().getFullYear(), new Date().getMonth()),
            currYear: new Date().getFullYear(),
            currMonth: new Date().getMonth(),
            currDay: new Date().getDate(),
            trainingInTimeFrame: []
        }
    }
    updateCalObject = () => {
        // updates the calendar object in state to display the proper calendar
        // then it updates the trainingInTimeframe array based on the current
        // calendar
        let {currYear, currMonth} = this.state;
        this.setState({
            calObject: calendar().detailed(currYear, currMonth)
        }, () => {
            this.getTraining();
        });
    }
    todaysDate = () => {
        // set state to the current month
        this.setState({
            currMonth: new Date().getMonth(),
            currYear: new Date().getFullYear()
        }, () => {
            this.updateCalObject();
        });
    }
    previousMonth = () => {
        // set state to the month before current state, then update the calendar
        this.setState(prevState => {
            if (prevState.currMonth > 0) {
                return {currMonth: prevState.currMonth - 1}
            } else {
                return {currMonth: 11, currYear: prevState.currYear - 1}
            }
        }, () => {
            this.updateCalObject();
        });
    }
    nextMonth = () => {
        // set state to the month after current state, then updated the calendar
        this.setState(prevState => {
            if (prevState.currMonth < 11) {
                return {currMonth: prevState.currMonth + 1}
            } else {
                return {currMonth: 0, currYear: prevState.currYear + 1}
            }
        }, () => {
            this.updateCalObject();
        });
    }
    toggleTimeframe = () => {
        this.setState(prevState => {
            let newTimeframe = prevState.timeFrame === "month" ? "week" : "month";
            return {timeFrame: newTimeframe};
        });
    }
    getTraining = () => {
        // filter training so that only training in the current timeframe is saved to this state
        let {calendar} = this.state.calObject;
        let firstDay = calendar[0][0];
        let lastWeek = calendar[calendar.length-1];
        let lastDay = lastWeek[lastWeek.length-1]
        let startTime = Date.parse(firstDay.date);
        let endTime = Date.parse(lastDay.date);
        fetch(`/api/training/${startTime}/${endTime}`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let updatedJson = this.reformatTrainingDate(json);
            this.setState({
                trainingInTimeFrame: updatedJson
            })
        })
    }
    reformatTrainingDate = (jsonArray) => {
        let newJsonArray = jsonArray.map(training => {
            let options = {
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            };
            let formattedDate = Date(training.date).toLocaleString("default", options);
            training.date = formattedDate;
            return training;
        });
        return newJsonArray;
    }
    componentDidMount = () => {
        // filter the training based on the current timeframe. this will eventually be swapped
        // to a more specific timeframe API search which will require less state setting functions
        this.getTraining();
    }
    render() {
        return (
            this.state.display === "calendar" ? 
                (
                    <Calendar
                        getTraining={this.getTraining}
                        training={this.state.trainingInTimeFrame}
                        timeFrame={this.state.timeFrame}
                        calObject={this.state.calObject}
                        toggleTimeframe={this.toggleTimeframe}
                        previousMonth={this.previousMonth}
                        nextMonth={this.nextMonth}
                        todaysDate={this.todaysDate}
                    />
                ) : (
                    <Graph
                        training={this.state.trainingInTimeFrame}
                        timeFrame={this.state.timeFrame}
                        toggleTimeframe={this.toggleTimeframe}
                    />
                )
        )
    }
}

export default CalendarDiv;