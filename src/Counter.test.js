import React from 'react';
import {shallow} from 'enzyme';

import {Counter} from './Counter';

describe("When rendering the counter", () => {
    let component;
    const count = 5;

    beforeEach(() => {
        component = shallow(<Counter count={count} />)
    })

    it("should display the right count", () => {
        expect(component.text()).toBe(count.toString());
    });
});