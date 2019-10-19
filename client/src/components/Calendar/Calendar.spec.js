import React from 'react';
import {mount} from 'enzyme';
import dateHelpers from '../../utils/dateHelpers';
import Calendar from './Calendar';

describe("the calendar unit test suit", () => {
    // some objects to use for testing
    let calObject = dateHelpers.initialize();
    // some general training object to use
    let trainingObject = {
        "createdAt": new Date(),
        "date": new Date(),
        "_id": "5d59b508d906051b264633c4",
        "duration": 55,
        "mode": "run",
        "intensity": 76,
        "feeling": 60,
        "comment": "woohoo!",
        "coachComment": "noice!"
    };
    // jest mock functions
    const previousMonth = jest.fn(() => "previous month");
    const nextMonth = jest.fn(() => "next month");
    const todaysDate = jest.fn(() => "today");
    const viewTraining = jest.fn(() => "view training!");
    // now insert the training into calObject!
    let updatedCalObject = dateHelpers.insertTrainingIntoCalObject([trainingObject], calObject);
    it("renders a calendar", () => {
        const wrapper = mount(<Calendar calObject={updatedCalObject} previousMonth={previousMonth} nextMonth={nextMonth} todaysDate={todaysDate} viewTraining={viewTraining} />);
        // looks baby!
        const header = wrapper.find('.calendar__header');
        const weekArray = wrapper.find('.calendar__week');
        const dayArray = wrapper.find('.calendar__day');
        expect(header).toHaveLength(1);
        expect(weekArray).toHaveLength(updatedCalObject.calendar.length);
        // this function returns the number of day objects
        let daysNum = updatedCalObject.calendar.reduce((total, currWeek) => {
            return total + currWeek.length;
        }, 0);
        expect(dayArray).toHaveLength(daysNum);
    });
    it("renders an array of weeks", () => {
        const wrapper = mount(<Calendar calObject={updatedCalObject} previousMonth={previousMonth} nextMonth={nextMonth} todaysDate={todaysDate} viewTraining={viewTraining} />);
        const header = wrapper.find('.calendar__header');
        // Mon is the first day in the header
        expect(header.childAt(1).text()).toBe("Mon");
        const dayP = wrapper.find('.day-p');
        // the first day number is represented by the first day number in the calendar object!
        expect(dayP.first().text()).toBe(updatedCalObject.calendar[0][0].day.toString())
    });
    it("has a button bar that responds to clicks", () => {
        const wrapper = mount(<Calendar calObject={updatedCalObject} previousMonth={previousMonth} nextMonth={nextMonth} todaysDate={todaysDate} viewTraining={viewTraining} />);
        const buttons = wrapper.find('.no-outline-button');
        // click them buttons!
        buttons.first().simulate('click');
        buttons.at(2).simulate('click');
        expect(buttons).toHaveLength(3);
        expect(previousMonth).toHaveBeenCalled();
        expect(nextMonth).toHaveReturnedWith("next month");
    });
    it("displays training correctly", () => {
        const wrapper = mount(<Calendar calObject={updatedCalObject} previousMonth={previousMonth} nextMonth={nextMonth} todaysDate={todaysDate} viewTraining={viewTraining} />);
        const todayNumString = new Date().getDate().toString();
        const todayNode = wrapper.find('.active');
        expect(todayNode.childAt(0).text()).toBe(todayNumString);
        expect(todayNode.hasClass('training')).toBe(true);
        const trainingDiv = todayNode.find('.day-training');
        expect(trainingDiv).toHaveLength(1);
    });
    it("renders days that can be clicked", () => {
        const wrapper = mount(<Calendar calObject={updatedCalObject} previousMonth={previousMonth} nextMonth={nextMonth} todaysDate={todaysDate} viewTraining={viewTraining} />);
        const todayNode = wrapper.find('.active');
        todayNode.simulate('click');
        expect(viewTraining).toHaveReturnedWith('view training!')
    });
});