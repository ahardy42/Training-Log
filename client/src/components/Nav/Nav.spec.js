import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {mount} from 'enzyme';

import Nav from './Nav';

describe("nav component test suite", () => {
    const mockSignout = jest.fn();
    it("renders a nav html tag", () => {
        const navWrapper = mount(
            <Router>
                <Nav name="" handleSignOut={mockSignout} isLoggedIn={false} pathName="/" />
            </Router>
        );
        expect(navWrapper.find("nav")).toHaveLength(1);

    });
    it("renders a button based on login status", () => {
        const navWrapper = mount(
            <Router>
                <Nav name="Andy" handleSignOut={mockSignout} isLoggedIn={true} pathName="/" />
            </Router>
        );
        const theButton = navWrapper.find("button");
        expect(theButton).toHaveLength(1);
        expect(theButton.text()).toBe("Sign Out");
    });
    it("renders links based on path string", () => {
        const navWrapper = mount(
            <Router>
                <Nav name="" handleSignOut={mockSignout} isLoggedIn={false} pathName="/login" />
            </Router>
        );
        const linkList = navWrapper.find("ul");
        const firstLinkPath = linkList.find("a").first().prop("href");
        expect(linkList.children()).toHaveLength(2);
        expect(firstLinkPath).toBe("/signup");
    });
});