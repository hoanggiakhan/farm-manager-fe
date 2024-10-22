import React, { useState } from 'react';
import { Card, Form, Button, Table, Container, Row, Col } from 'react-bootstrap';

interface FarmArea {
  name: string;
  cropOrAnimal: string;
}

const FarmAreas: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cropOrAnimal, setCropOrAnimal] = useState<string>('');
  const [farmAreas, setFarmAreas] = useState<FarmArea[]>([]);

  const handleAddFarmArea = (e: React.FormEvent) => {
    e.preventDefault();
    const newArea: FarmArea = { name, cropOrAnimal };
    setFarmAreas([...farmAreas, newArea]);
    setName('');
    setCropOrAnimal('');
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Quản lý khu vực nông trại</h1>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-primary">Thêm khu vực nông trại</Card.Title>
          <Form onSubmit={handleAddFarmArea}>
            <Form.Group className="mb-3">
              <Form.Label>Tên khu vực</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên khu vực"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Loại cây trồng/động vật</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập loại cây trồng hoặc động vật"
                value={cropOrAnimal}
                onChange={(e) => setCropOrAnimal(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Thêm khu vực
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="text-primary">Danh sách khu vực nông trại</Card.Title>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Tên khu vực</th>
                <th>Loại cây trồng/động vật</th>
              </tr>
            </thead>
            <tbody>
              {farmAreas.map((area, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}>
                  <td>{area.name}</td>
                  <td>{area.cropOrAnimal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FarmAreas;
