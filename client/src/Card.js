import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'

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

const CardExampleContentBlock = () => (
  <Card>
    <Card.Content>
      <Card.Header>Platform</Card.Header>
    </Card.Content>
    <Card.Content>
      <Tab menu={{ secondary: true }} panes={panes} />
    </Card.Content>
  </Card>


)

export default CardExampleContentBlock
