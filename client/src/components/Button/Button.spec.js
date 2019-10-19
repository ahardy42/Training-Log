import React from 'react';
import {mount} from 'enzyme';
import Button from './Button';

describe("the button render suite", () => {
    const clicky = jest.fn();
    it("renders a button", () => {
        const wrapper = mount(<Button action="button" id="dingus" extraClasses="dude" handleClick={clicky} >Hey SuckaPantz!</Button>);
        expect(wrapper).toHaveDisplayName('Button');
        expect(wrapper).toHaveText('Hey SuckaPantz!');
        expect(wrapper.childAt(0).hasClass("dude")).toBe(true);
    });
    it("can be clicked!", () => {
        const wrapper = mount(<Button action="button" id="dingus" extraClasses="dude" handleClick={clicky} >Hey SuckaPantz!</Button>);
        wrapper.invoke('handleClick')();
        expect(clicky).toHaveBeenCalled();
    })
})