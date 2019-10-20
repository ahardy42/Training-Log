import React from 'react';
import {mount} from 'enzyme';
import Alert from './Alert';

describe("Alert Component test suite", () => {
    // set up the wrapper for testing
    let wrapper;
    const wrapperCreator = (props) => mount(<Alert messageType={props.messageType}>{props.children}</Alert>);
    beforeEach(() => {
        let props = {
            messageType: "Error",
            children: "Some... Thing... Some thing is on the wing..."
        };
        wrapper = wrapperCreator(props);
    });

    afterEach(() => wrapper.unmount());

    // assertions
    it("renders an alert", () => {
        expect(wrapper.find(".alert")).toHaveLength(1);
    });

    it("displays text based on props", () => {
        expect(wrapper.find("div").text()).toBe("Some... Thing... Some thing is on the wing...");
    });

    it("displays a color based on type", () => {
        expect(wrapper.find(".alert-danger")).toHaveLength(1);
    });
})