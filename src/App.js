import React, { Component } from 'react';
import './App.css';
import CounterLayout from './CounterLayout';

class App extends Component {
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

export default App;
