import React from 'react';
import {shallow} from 'enzyme';
import CounterLayout from './CounterLayout';

describe("When rendering the counter layout", () => {
    let component;
    let count = 0;

    beforeEach(() => {
        component = shallow(<CounterLayout
            count={count} />);
    });

    it("should contain the counter component with the riqht count passed", () => {
        const counter = component.find("Counter");
        expect(counter.length).not.toBe(0);
        expect(counter.prop('count')).toBe(0);
    });

    it("should contain the increase component with an action passed", () => {
        const increment = component.find("Increment");
        expect(increment.length).not.toBe(0);
        expect(increment.prop('onIncrement')).not.toBe(undefined);
    });

    describe("when incrementing", () => {
        beforeEach((done) => {
            const increment = component.find("Increment");
            increment.simulate('increment');
            process.nextTick(done);
        });

        it("should have increased the count", () => {
            expect(component.state().count).toBe(1);
        });

        it("should have passed the right count to the counter component", () => {
            const counter = component.find("Counter");
            expect(counter.length).not.toBe(0);
            expect(counter.prop('count')).toBe(1);
        });
    });

})