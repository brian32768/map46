import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const img = require('/assets/Proud.jpg');
const alt = 'This is a pigeon';

const Contact = () => (
    <div>
      <Card className="card">
        <CardImg className="card_image" src={img} alt={alt}></CardImg>
        <CardBody>
          <CardTitle>Contact us</CardTitle>
          <CardText>
          Tie a message to this pigeon's leg or alternatively,
            send me email at <a href="mailto:brian@wildsong.biz">brian@wildsong.biz</a>
          </CardText>
        </CardBody>
      </Card>
    </div>
)
export default Contact
