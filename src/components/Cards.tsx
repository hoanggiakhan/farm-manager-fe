import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Cards: React.FC = () => {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Số lượng vật nuôi</Card.Title>
            <Card.Text>200</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Sản lượng thu hoạch</Card.Title>
            <Card.Text>1500 kg</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Doanh thu gần đây</Card.Title>
            <Card.Text>$10,000</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;
