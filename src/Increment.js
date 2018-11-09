import React, { Component } from 'react';
import './Increment.css';

class Increment extends Component {
    render() {
        const {onIncrement} = this.props;
        return <button onClick={onIncrement}>Increment</button>
    }
}

export default Increment;