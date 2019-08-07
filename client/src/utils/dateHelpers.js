import moment from 'moment';
import calendar from 'calendar-js';
// const moment = require('moment');
// const calendar = require('calendar-js');

const dateHelpers = {
    // timeframe will be a string: either "month" or "week" to begin
    nextMonth: (timeframe, calObject) => {
    },
    lastMonth: (timeframe, calObject) => {
        
    },
    initialize: () => {
        // function runs to set the state of Athlete
        let now = moment().toObject();
        let calObject = calendar().detailed(parseInt(now.years), parseInt(now.months), (data, calendar) => {
            let bool = moment().startOf('day').format() === moment(data.date).startOf('day').format();
            let training = [];
            return Object.assign({
                isToday: bool,
                customDate: moment(data.date).format("MM/DD/YYYY"),
                training: training
            }, data);
        });
        // add some unix start and stop times in the calObject for API searching
        let i = calObject.calendar.length - 1;
        let j = calObject.calendar[i].length -1;
        calObject.startUnix = moment(calObject.calendar[0][0].date).startOf('day').valueOf();
        calObject.endUnix = moment(calObject.calendar[i][j].date).endOf('day').valueOf();
        return calObject;
    },
    insertTrainingIntoCalObject: (training, calObject) => {
        // will add training to each day object where there is training
        let reformattedTraining = training.map(activity => {
            return Object.assign({
                reformattedDate: moment(activity.date).format("MM/DD/YYYY")
            }, activity);
        });
        // loop through the calendar nested array and add the training array for each day that matches the formatted date
        let updatedCalendar = calObject.calendar.map(week => {
            for (let i = 0; i < week.length; i++) {
                week[i].training = reformattedTraining.filter(activity => {
                    console.log(activity.reformattedDate, week[i].customDate);
                    console.log(activity.reformattedDate === week[i].customDate);
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