import React from 'react';
import Card from 'react-bootstrap/Card';

const DigimonCard = ({ digimon }) => {
  return (
    <Card style={{ width: '18rem' }} className="m-3">
      <Card.Img variant="top" src={digimon.img} />
      <Card.Body>
        <Card.Title>{digimon.name}</Card.Title>
        <Card.Text>{digimon.level}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DigimonCard;




