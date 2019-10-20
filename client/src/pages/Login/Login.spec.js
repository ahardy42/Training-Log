import React from 'react';
import {mount} from 'enzyme';
import Login from './Login';

describe("Login test suite", () => {
    // test setup
    let wrapper;
    const wrapperCreator = props => mount(<Login {...props} />);

    beforeEach(() => {
        const props = {
            handleInputChange: jest.fn(),
            handleClick: jest.fn(),
            message: {}
        }

        wrapper = wrapperCreator(props);
    });

    afterEach(() => wrapper.unmount());

    // test assertions
    it("renders a login page", () => {
        expect(wrapper.find(".login")).toHaveLength(1);
        expect(wrapper.find(".card-title").text()).toBe("Login to view your training");
    });

    it("renders an alert if there is a message", () => {
        expect(wrapper.find(".alert")).toHaveLength(0);
        wrapper.setProps({message: {messageType: "Error", messageText: "Woops!"}}, () => {
            expect(wrapper.find(".alert")).toHaveLength(1);
            expect(wrapper.find(".alert").text()).toBe("Woops!");
        });
    });

    it("renders a login form", () => {
        expect(wrapper.find("form")).toHaveLength(1);
        expect(wrapper.find("input")).toHaveLength(2);
        expect(wrapper.find("button")).toHaveLength(1);
    });
})