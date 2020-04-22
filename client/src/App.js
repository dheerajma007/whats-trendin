import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import './App.css';
import CardBlock from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      twitterTrend : []
    };
}

  componentDidMount(){
    console.log('Fetching API results');
    Promise.all([fetch('/twitter'), fetch('twitter?country=IN')])
      .then(([res1, res2]) => {
        //fetch returns a prmosie
        //now converting the promise to json
        //.json() also returns a promise
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        //json is obtained. now updating state.
        //state is immutable and hence should not be updated directly by using this.
        //use setState
        console.log('Updating state');
        this.setState({
          twitterTrend:[res1, res2]
        });
      });
  }

  render() {
    const trend = this.state.twitterTrend;
    console.log("trend in render ", trend);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Whats trendin?</h1>
        </header>
        {/*<div className="Card-block">
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
        </div>*/}
        <div className="Card-block">
          <h2 className="Platform-title"><FontAwesomeIcon icon={faTwitterSquare} />  TWITTER</h2>
          <CardBlock content={ this.state.twitterTrend }/>
        </div>
      </div>
    )
  }
}

export default App;
