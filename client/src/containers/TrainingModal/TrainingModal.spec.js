import React from 'react';
import TrainingModal from './TrainingModal';
import {mount} from 'enzyme';

describe("Training Modal test suite", () => {

    // test setup
    let wrapper;
    const createWrapper = props => mount(<TrainingModal {...props} />)
    beforeEach(() => {
        const props = {
            teamName: "TEST",
            switchToEdit: jest.fn(),
            addTraining: jest.fn(),
            deleteTraining: jest.fn(),
            updateTraining: jest.fn(),
            style: {},
            handleClose: jest.fn(),
            handleClickOutsideModal: jest.fn(),
            isAdd: true,
            isEdit: false,
            training: []
        }
        wrapper = createWrapper(props);
    });
    afterEach(() => wrapper.unmount());

    // test assertions
    it("renders a close button", () => {
        let closeButton = wrapper.find(".no-outline-button");
        expect(closeButton).toHaveLength(1);
    });

    it("renders a form if isAdd or isEdit", () => {
        expect(wrapper.find(".modal-title").text()).toBe("Add Training");
        expect(wrapper.find('form')).toHaveLength(1);
        wrapper.setProps({isAdd: false}, () => {
            expect(wrapper.find(".modal-title").text()).toBe("Here's your training!");
            expect(wrapper.find("form")).toHaveLength(0);
        });
    });

    it("renders a training display if !isAdd and !isEdit", () => {
        // setting isAdd to false (isEdit already false)
        wrapper.setProps({isAdd: false}, () => {
            expect(wrapper.find("ul")).toHaveLength(1);
            expect(wrapper.find("form")).toHaveLength(0);
        });
        // setting isEdit to true
        wrapper.setProps({isEdit: true}, () => {
            expect(wrapper.find("ul")).toHaveLength(0);
            expect(wrapper.find("form")).toHaveLength(1);
        });
    });
    it("renders a datepicker", () => {

    });
    it("renders hour and minute inputs", () => {
        let inputs = wrapper.find("input");
        let hourInput = inputs.find("#hours");
        let minuteInput = inputs.find("#minutes");
        expect(hourInput).toHaveLength(1);
        expect(hourInput).toContainMatchingElement("input");
        expect(minuteInput).toHaveLength(1);
        expect(minuteInput).toContainMatchingElement("input");
        expect(hourInput).toHaveProp("type", "number");
        expect(minuteInput).toHaveProp("type", "number");
    });
    describe("hour and minute input suite", () => {
        it("converts negative numbers into positive numbers", () => {
            expect(wrapper).toHaveState({hours: 0, minutes: 0});
            // simulate onChange event
            const instance = wrapper.instance(); // instance of the react component
            instance.handleInputChange({preventDefault: jest.fn(), target: {name: "hours", value: -1}});
            expect(wrapper).toHaveState({hours: 1});
        });
        it("doesn't accept letters", () => {
            expect(wrapper).toHaveState({hours: 0, minutes: 0});
            // simulate onChange event
            const instance = wrapper.instance(); // instance of the react component
            instance.handleInputChange({preventDefault: jest.fn(), target: {name: "hours", value: "d"}}, instance.checkTime);
            expect(wrapper).toHaveState({hours: 0});
        });
    })
})