import React, { Component } from 'react';

class Counter extends Component {
    render() {
        const {count} = this.props;
        return <span>{count}</span>
    }
}

export default Counter;