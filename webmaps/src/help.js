import React from 'react'
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap'

const img = require('/assets/lewis_and_clark.jpg');
const alt = 'Lewis and Clark';

export const Help = (props) => (
    <div>
      <Card className="card">
        <CardImg className="card_image" width="100%" src={img} alt={alt}></CardImg>
        <CardTitle>
        Help!
        </CardTitle>
        <CardText>
        Something helpful should show up here
        </CardText>
      </Card>
    </div>
)
