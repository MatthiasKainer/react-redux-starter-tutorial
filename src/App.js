import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import CounterLayout from './CounterLayout';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CounterLayout />
        </header>
      </div>
    );
  }
}

export default connect()(App);
