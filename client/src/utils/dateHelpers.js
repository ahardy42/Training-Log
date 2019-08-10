import moment from 'moment';
import calendar from 'calendar-js';
// const moment = require('moment');
// const calendar = require('calendar-js');

const dateHelpers = {
    createInitObject: function(calObject, isIncrement) {
        let month = moment(calObject.month, "MMMM").month();
        let year = moment(calObject.year, "YYYY").year();
        let obj = {};
        if (isIncrement) { // called from nextMonth with true
            return Object.assign({
                months: month === 11 ? 0 : month + 1,
                years: month === 11 ? year + 1 : year
            }, obj);
        } else {
            return Object.assign({ // called from prevMonth with false
                months: month === 0 ? 11 : month - 1,
                years: month === 0 ? year - 1 : year
            }, obj);
        }
    },
    nextMonth: function(calObject) {
        // creates a new calObj for one month in ahead of the current month
        let obj = this.createInitObject(calObject, true);
        console.log(obj);
        return this.initialize(obj);
    },
    prevMonth: function(calObject) {
        // creates a new calObj for one month less than current month
        let obj = this.createInitObject(calObject, false);
        return this.initialize(obj);
    },
    initialize: function(obj) {
        // function runs to set the state of Athlete
        let now = obj ? obj : moment().toObject();
        console.log(now);
        let calObject = calendar().detailed(parseInt(now.years), parseInt(now.months), (data, calendar) => {
            let bool = moment().startOf('day').format() === moment(data.date).startOf('day').format();
            let training = [];
            return Object.assign({
                isToday: bool,
                customDate: moment(data.date).format("MM/DD/YYYY"),
                training: training
            }, data);
        });
        // add month number into calObject for API searching
        calObject.monthNum = new Date(`${calObject.month} ${calObject.year}`).getMonth() + 1
        return calObject;
    },
    insertTrainingIntoCalObject: function (training, calObject) {
        // will add training to each day object where there is training
        let reformattedTraining = training.map(activity => {
            return Object.assign({
                reformattedDate: moment(activity.date).format("MM/DD/YYYY")
            }, activity);
        });
        console.log(reformattedTraining);
        // loop through the calendar nested array and add the training array for each day that matches the formatted date
        let updatedCalendar = calObject.calendar.map(week => {
            for (let i = 0; i < week.length; i++) {
                week[i].training = reformattedTraining.filter(activity => {
                    return activity.reformattedDate === week[i].customDate;
                });
            }
            return week;
        });
        return Object.assign({
            calendar: updatedCalendar
        }, calObject);
    }
}

export default dateHelpers;