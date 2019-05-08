import React from 'react'
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap'

const img = require('/assets/lewis_and_clark.jpg');
const alt = 'Lewis and Clark';

const News = (props) => (
    <div>
      <Card className="card">
        <CardImg className="card_image" width="100%" src={img} alt={alt}></CardImg>
        <CardTitle>
        News
        </CardTitle>
        <CardText>
        If I had any messages they'd go here. Updates etc...
        </CardText>
      </Card>
    </div>
)

export default News;
