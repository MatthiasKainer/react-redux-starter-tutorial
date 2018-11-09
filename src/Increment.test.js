import React from 'react';
import {shallow} from 'enzyme';

import {Increment} from './Increment';

describe("When having an incrementor", () => {
    const onIncrement = jest.fn();
    let component;

    beforeEach(() => {
        component = shallow(<Increment onIncrement={onIncrement} />);
    });

    it("should trigger the onIncrement when the button is clicked", () => {
        const button = component.find("button");
        button.simulate('click');
        expect(onIncrement.mock.calls.length).toBe(1);
    });
});