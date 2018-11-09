import React, { Component } from 'react';
import { connect } from 'react-redux';

import Counter from './Counter';
import Increment from './Increment';

export class CounterLayout extends Component {
    render() {
        const {count, onIncrement} = this.props;
        return <div>
            <p>You clicked <Counter count={count} /> times!</p>
            <Increment onIncrement={() => onIncrement()} />
        </div>;
    }
}

const mapStateToProps = state => ({
    count : state.counter
});

const mapDispatchToProps = dispatch => ({
    onIncrement: () => dispatch({type : 'INCREASE'})
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CounterLayout);