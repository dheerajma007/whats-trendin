import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { text : "sample"};

  componentDidMount(){
    fetch('/welcome')
    .then(res => res.text())
    .then(resText => this.setState({ text:resText }));
  }

  render() {
    const { text } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to whats-trendin!</h1>
        </header>
        <p className="App-into">{text}</p>
      </div>
    )
  }
}

export default App;
