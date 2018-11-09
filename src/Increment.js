import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Increment.css';

export class Increment extends Component {
    render() {
        const {onIncrement} = this.props;
        return <button onClick={onIncrement}>Increment</button>
    }
}

const mapDispatchToProps = dispatch => ({
    onIncrement: () => dispatch({type : 'INCREASE'})
});
export default connect(() => ({}), mapDispatchToProps)(Increment);