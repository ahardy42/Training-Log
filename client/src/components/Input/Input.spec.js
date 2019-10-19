import React from 'react';
import {mount} from 'enzyme';
import Input from './Input';

describe("input unit test", () => {
    const inputFunc = jest.fn((event, validationFunc) => validationFunc ? validationFunc() : 'no validation');
    const validationFunc = jest.fn(() => 'donkey kong rules!');
    it("renders a select", () => {
        const newProps = {
            teams: [
                {
                    "_id": "5d605780921329045b2d4f4f",
                    "name": "TEST"
                }
            ]
        }
        const selectWrapper = mount(<Input name="select" value="" action="select" handleInputChange={inputFunc} validationFunction={validationFunc}>Select Yo!</Input>);
        expect(selectWrapper.find("select")).toHaveLength(1);
        expect(selectWrapper.find("option")).toHaveLength(1);
        expect(selectWrapper.find("option").text()).toBe("Loading Teams...");
        expect(selectWrapper.find("label").text()).toBe("Select Yo!");
        // load some teams as a prop
        selectWrapper.setProps(newProps);
        expect(selectWrapper.find("option").text()).toBe("TEST");
    });
    it("renders a radio input", () => {
        const newProps = {
            checked: true
        };
        const changeFunc = jest.fn();
        const radioWrapper = mount(<Input action="radio" value="" checked={false} handleCheck={changeFunc}>Fun!</Input>);
        expect(radioWrapper.find("input").hasClass("form-check-input")).toBe(true);
        expect(radioWrapper.find("input").prop("type")).toBe("radio");
        expect(radioWrapper.find("input")).not.toBeChecked();
        expect(radioWrapper.find("label").text()).toBe("Fun!");
        // click the radio which checks the radio
        changeFunc.mockImplementationOnce(radioWrapper.setProps(newProps));
        radioWrapper.simulate("click");
        expect(radioWrapper.find("input")).toBeChecked();

    });
    it("renders a range input", () => {
        const newProps = {
            value: 3
        }
        const changeFunc = jest.fn();
        const rangeWrapper = mount(<Input action="range" value="" handleInputChange={changeFunc} validationFunction={validationFunc}>Range Yo!</Input>);
        expect(rangeWrapper.find("input").hasClass("form-control")).toBe(true);
        expect(rangeWrapper.find("input").prop("type")).toBe("range");
        expect(rangeWrapper.find("small")).toHaveLength(3);
        // hit the range slider for a change
        changeFunc.mockImplementationOnce(rangeWrapper.setProps(newProps));
        rangeWrapper.simulate("change");
        expect(rangeWrapper.prop("value")).toBe(3);
    });
    it("renders a text input", () => {
        const textInputWrapper = mount(<Input action="username" value="" handleInputChange={inputFunc} validationFunction={validationFunc}>username Yo!</Input>);
        expect(textInputWrapper.find("label").text()).toBe("username Yo!");
        expect(textInputWrapper.find("input").prop("placeholder")).toBe("Enter username");
        expect(textInputWrapper.find("input").prop("type")).toBe("username");
    });
})