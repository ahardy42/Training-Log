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
            currDay: new Date().getDate()
        }
    }
    updateCalObject = () => {
        let {currYear, currMonth} = this.state;
        this.setState({
            calObject: calendar().detailed(currYear, currMonth)
        });
    }
    todaysDate = () => {
        this.setState({
            currMonth: new Date().getMonth(),
            currYear: new Date().getFullYear()
        }, () => {
            this.updateCalObject();
        });
    }
    previousMonth = () => {
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
    render() {
        return (
            this.state.display === "calendar" ? 
                (
                    <Calendar
                        timeFrame={this.state.timeFrame}
                        currDay={this.state.currDay}
                        calObject={this.state.calObject}
                        toggleTimeframe={this.toggleTimeframe}
                        previousMonth={this.previousMonth}
                        nextMonth={this.nextMonth}
                        todaysDate={this.todaysDate} />
                ) : (
                    <Graph 
                    timeFrame={this.state.timeFrame}
                    toggleTimeframe={this.toggleTimeframe} />
                )
        )
    }
}

export default CalendarDiv;