import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import './App.css';
import CardExampleContentBlock from './Card';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      twitterTrend : []
    };
}

  componentDidMount(){
    fetch('/twitter')
    .then(res => res.json())
    .then(resText => this.setState({ twitterTrend:resText }));
  }

  render() {
    const { twitterTrend } = this.state.twitterTrend;
    console.log(twitterTrend);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to whats-trendin!</h1>
        </header>
        <div className="Card-block">
        <Card>
          <Card.Content>
            <Card.Header>Twitter</Card.Header>
          </Card.Content>
          <Card.Content>
            <ul>
              {this.state.twitterTrend.map(trend => (<li><a href={trend.url}>{trend.name}</a></li>))}
            </ul>
          </Card.Content>
        </Card>
        </div>
        {/*<div className="Card-block">
          <CardExampleContentBlock/>
        </div> */}
      </div>
    )
  }
}

export default App;
