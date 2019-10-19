import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {mount} from 'enzyme';
import Athlete from './Athlete';

// response mock
import API from '../../utils/API';
jest.mock('../../utils/API');

/**
 * testing the Athlete component with all child components to make sure I can:
 * 1. view the calendar and charts
 * 2. click an existing training to open the modal in training display mode
 * 3. click edit training to edit the training
 * 4. click add to add new training
 * 5. go forward and backward in the calendar
 * 6. logout
 */

describe("the athlete unit test suite", () => {
    it("displays a calendar and charts with the current month", () => {
        
    });
    it("renders a button to add training", () => {

    });
    it("renders a set of graphs based on the athlete's training", () => {

    });
    describe("the add/modify/delete suite", () => {
        it("allows you to add training", () => {

        });
        it("allows you to edit training", () => {

        });
        it("allows you to delete training", () => {

        });
        it("allows you to view training", () => {

        });
    })
})