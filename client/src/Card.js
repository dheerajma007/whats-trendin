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

const CardBlock = ( props ) => {
  return(
    <div className="Cards-container">
        {
          props.content.map(item => (
            <Card key={item.country} className="Card-ui">
              <Card.Content className="Card-header">
                <Card.Header className="Card-country">{item.country}</Card.Header>
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
