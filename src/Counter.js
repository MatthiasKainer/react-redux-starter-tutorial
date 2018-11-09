import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Counter extends Component {
    render() {
        const {count} = this.props;
        return <span>{count}</span>
    }
}

const mapStateToProps = state => ({ count : state.counter });
export default connect(mapStateToProps)(Counter);