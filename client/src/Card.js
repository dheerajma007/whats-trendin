import React from 'react'
import { Card, CardHeader, CardContent, CardDescription } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import './Card.css';

const panes = [
  {
    menuItem: 'World',
    render: () => <Card.Content>
      <Card.Description>World trending</Card.Description>
    </Card.Content>,
  },
  {
    menuItem: 'India',
    render: () => <Card.Content>
      <Card.Description>India trending</Card.Description>
    </Card.Content>,
  },
  {
    menuItem: 'Local',
    render: () => <Card.Content>
      <Card.Description>Local trending</Card.Description>
    </Card.Content>,
  },
]

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
                  item.data.map(trend => (
                    <CardDescription className="Card-trend"><a href={trend.url}>{trend.name}</a></CardDescription>
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
