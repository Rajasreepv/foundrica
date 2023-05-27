import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Cards(props) {
  return (
    <div  className="col-11 col-md-6 col-lg-4 mx-0 mb-4">
    <Card >
      <Card.Body>
      {props.img && <Card.Img variant="top" className="card-img" src={props.img}  />}
      
        <Card.Title className='cardtitle' >{props.title}</Card.Title>
       
        <Card.Text className="cardcontent"  style={{ fontSize: '16px'}}>
         {props.content}
        
        </Card.Text>
        <center>
        {props.social &&  <Link className="connect" to={props.link}  > {props.social}</Link>}
        </center>
      </Card.Body>
    </Card>
    </div>
 
  );
}

export default Cards;
