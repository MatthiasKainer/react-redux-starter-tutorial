import React, { Component } from 'react';
import { connect } from 'react-redux';

import Counter from './Counter';
import Increment from './Increment';

export class CounterLayout extends Component {
    render() {
        return <div>
            <p>You clicked <Counter/> times!</p>
            <Increment />
        </div>;
    }
}

export default connect()(CounterLayout);