import React from 'react'
import { Card, CardDescription } from 'semantic-ui-react'
import './Card.css';

function getCountText(count) {
  if(count < 10000){
    return count.toString();
  }
  else{
    return (count/1000).toFixed(1).toString() + 'K';
  }
}

function getLastUpdated(timestamp) {
  var timeText = "";
  var currentTime = new Date().getTime(); //UTC timestamp
  var diff = (currentTime - timestamp);
  diff = diff/1000;
  if(diff < 60){
    timeText = 'few seconds';
  }
  else if(diff < 60 * 60){
    var minutes = Math.floor(diff/60);
    timeText = minutes + ' minute' + (minutes>1?'s':'');
  }
  else if(diff < 60 * 60 * 24){
    var hours = Math.floor(diff/(60*60));
    timeText = hours + ' hour' + (hours>1?'s':'');
  }
  else{
    var days = Math.floor(diff/(60*60*24));
    timeText = days + ' day' + (days>1?'s':'');
  }

  return 'Updated ' + timeText + ' ago';
}

const CardBlock = ( props ) => {
  return(
    <div className="Cards-container">
        {
          props.content.map(item => (
            <Card key={item.country} className="Card-ui">
              <Card.Content className="Card-header">
                <Card.Header className="Card-country">{item.country}</Card.Header>
                <Card.Meta>{getLastUpdated(item.lastUpdated)}</Card.Meta>
              </Card.Content>
                <div className="Card-row">
                  <div className="Card-column-left">
                  <Card.Content>
                    {
                      item.data.map((trend, index) => (
                        <CardDescription key={index}className="Card-trend"><a href={trend.url}>{trend.name}</a></CardDescription>
                      ))
                    }
                  </Card.Content>
                  </div>
                  <div className="Card-column-right">
                  <Card.Content>
                    {
                      item.data.map((trend, index) => (
                        <CardDescription key={index}className="Card-trend">{trend.count?getCountText(trend.count):'-   -   -'}</CardDescription>
                      ))
                    }
                  </Card.Content>
                  </div>
                </div>
            </Card>
          ))
        }
    </div>
  )
  }
export default CardBlock
