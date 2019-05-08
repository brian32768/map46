import React from 'react'
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap'

const img = require('/assets/lewis_and_clark.jpg');
const alt = 'Lewis and Clark';

const Faq = (props) => (
    <div>
      <Card className="card">
        <CardImg className="card_image" width="100%" src={img} alt={alt}></CardImg>
        <CardTitle>
          FAQ
        </CardTitle>
        <CardText>
            Q. Is there a FAQ for this web site?<br/>
            A. No.
        </CardText>
      </Card>
    </div>
)

export default Faq;
