import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import Auth from './Auth';

//setup wrapper function returns the wrapper
const wrapperCreator = (testProps) => mount(<Router><Route render={(props) => <Auth {...props} {...testProps} />} /></Router>);

describe("Auth container test suite", () => {

    //assertions
    describe("action based test suite", () => {
        it("renders a login page if action === login", () => {
            let testProps = {
                message: {},
                isLoggedIn: false,
                submit: jest.fn(),
                action: "login" //initally it will render the login page
            }
            let wrapper = wrapperCreator(testProps);
            expect(wrapper.find(".login")).toHaveLength(1);
            expect(wrapper.find(".signup")).toHaveLength(0);
        });

        it("renders a signup page if action === signup", () => {
            let testProps = {
                message: {},
                isLoggedIn: false,
                submit: jest.fn(),
                action: "signup" 
            }
            let wrapper = wrapperCreator(testProps);
            expect(wrapper.find(".login")).toHaveLength(0);
            expect(wrapper.find(".signup")).toHaveLength(1);
        });

        it("renders the reset page if the action === reset", () => {
            let testProps = {
                message: {},
                isLoggedIn: false,
                submit: jest.fn(),
                action: "reset" 
            }
            let wrapper = wrapperCreator(testProps);
            expect(wrapper.find(".login")).toHaveLength(0);
            expect(wrapper.find(".signup")).toHaveLength(0);
            // there will be a form and no list initially
            expect(wrapper.find("form")).toHaveLength(1);
            expect(wrapper.find("ul")).toHaveLength(0);
            // form should have an input and a button
            let formComponents = wrapper.find("form").children();
            expect(formComponents.first()).toHaveDisplayName("Input");
            expect(formComponents.last()).toHaveDisplayName("Button");
        });
    })

    it("passes a message down to the display component", () => {
        let testProps = {
            message: {
                messageType: "Error",
                messageText: "Error!"
            },
            isLoggedIn: false,
            submit: jest.fn(),
            action: "login" //initally it will render the login page
        }
        let wrapper = wrapperCreator(testProps);
        expect(wrapper.find(".alert")).toHaveLength(1);
        expect(wrapper.find(".alert").text()).toBe("Error!");
    });

    it("redirects to main page if logged in (even without a user)", () => {
        let testProps = {
            message: {},
            isLoggedIn: true,
            submit: jest.fn(),
            action: "login" //initally it will render the login page
        }
        let wrapper = wrapperCreator(testProps);
        expect(wrapper.find(".login")).toHaveLength(0);
    });

});