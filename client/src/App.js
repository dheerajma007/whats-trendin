import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import CardExampleContentBlock from './Card';

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
          <h1 className="App-title">Welcome to whats-trendin!</h1>
        </header>
        <div className="Card-block">
          <CardExampleContentBlock/>
        </div>
      </div>
    )
  }
}

export default App;
