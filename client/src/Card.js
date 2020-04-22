import React from 'react'
import { Card, CardDescription } from 'semantic-ui-react'
import './Card.css';

const CardBlock = ( props ) => {

  return(
    <div className="Cards-container">
        {
          props.content.map(item => (
            <Card key={item.country} className="Card-ui">
              <Card.Content className="Card-header">
                <Card.Header className="Card-country">{item.country}</Card.Header>
              </Card.Content>
              <Card.Content>
                {
                  item.data.map((trend, index) => (
                    <CardDescription key={index}className="Card-trend"><a href={trend.url}>{trend.name}</a></CardDescription>
                  ))
                }
              </Card.Content>
            </Card>
          ))
        }
    </div>
  )
  }
export default CardBlock
