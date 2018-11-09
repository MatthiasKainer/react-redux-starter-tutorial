import React from 'react';
import {shallow} from 'enzyme';
import {CounterLayout} from './CounterLayout';
import Counter from './Counter';
import Increment from './Increment';

describe("When rendering the counter layout", () => {
    let component;
    let count = 0;

    beforeEach(() => {
        component = shallow(<CounterLayout
            count={count} />);
    });

    it("should contain the counter component with the riqht count passed", () => {
        const counter = component.find(Counter);
        expect(counter.length).not.toBe(0);
    });

    it("should contain the increase component with an action passed", () => {
        const increment = component.find(Increment);
        expect(increment.length).not.toBe(0);
    });
})