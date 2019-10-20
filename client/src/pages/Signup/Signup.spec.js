import React from 'react';
import {mount} from 'enzyme';
import Signup from './Signup';

describe("signup page test suite", () => {

    //setup
    let wrapper;
    const wrapperCreator = props => mount(<Signup {...props} />);

    beforeEach(() => {
        let props = {
            coachMessage: {},
            message: {},
            handleClick: jest.fn(),
            handleInputChange: jest.fn(),
            allowSubmit: false,
            invalidEmail: true,
            invalidPassword: true,
            invalidUserName: false,
            repeatUsername: false
        }
        wrapper = wrapperCreator(props);
    });

    // teardown
    afterEach(() => wrapper.unmount());

    //assertions
    it("renders a signup page with inputs", () => {
        // title test
        expect(wrapper.find("h2").text()).toBe("Sign Up for Stoked On Training!");
        //inputs test
        expect(wrapper.find("input")).toHaveLength(7);
        expect(wrapper.find("select")).toHaveLength(1);
    });

    it("displays a message based on props", () => {
        expect(wrapper.find(".alert")).toHaveLength(0);
        wrapper.setProps({coachMessage: {messageType: "Success", message: "Noice!"}}, () => {
            expect(wrapper.find(".alert")).toHaveLength(1);
            expect(wrapper.find(".alert").text()).toBe("Noice!");
        })
    });

    it("displays warning messages based on props", () => {
        expect(wrapper.find(".signup-error")).toHaveLength(3);
    });

    it("renders a button which responds to clicks", () => {
        wrapper.find("button").simulate("click");
        expect(wrapper.find("button").prop("onClick")).toHaveBeenCalled();
    });
})