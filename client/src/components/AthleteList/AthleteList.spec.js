import React from 'react';
import {mount} from 'enzyme';
import AthleteList from './AthleteList';

describe("render test suite", () => {
    const handleClick = jest.fn();
    const athlete = {
        _id: "testAthlete",
        name: "pre migration",
        athleteId: "5d806277b1004c4f7223d4cb",
        mode: [
            {
                mode: "ski",
                totalDuration: 60
            }
        ],
        totalTime: 60
    }
    it("renders the component properly", () => {
        const wrapper = mount(<AthleteList athlete={athlete} handleClick={handleClick}/>);
        const cardTitle = wrapper.find(".card-title");
        expect(wrapper.childAt(0)).toHaveDisplayName("li");
        expect(wrapper).toContainMatchingElement(".card-title");
        expect(cardTitle.text()).toBe("Athlete: " + athlete.name);
    });
    it("has a button that response to clicks", () => {
        const wrapper = mount(<AthleteList athlete={athlete} handleClick={handleClick}/>);
        const theButton = wrapper.find('.btn');
        theButton.invoke('onClick')();
        expect(handleClick).toHaveBeenCalled()
    });
})
