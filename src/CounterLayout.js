import React, { Component } from 'react';

import Counter from './Counter';
import Increment from './Increment';

class CounterLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count : this.props.count || 0
        }
    }

    onIncrement() {
        this.setState({
            count : this.state.count + 1
        });
    }

    render() {
        const {count} = this.state;
        return <div>
            <p>You clicked <Counter count={count} /> times!</p>
            <Increment onIncrement={() => this.onIncrement()} />
        </div>;
    }
}

export default CounterLayout;