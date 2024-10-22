import React, { useState } from 'react';
import { Card, Form, Button, Table, Container, Row, Col } from 'react-bootstrap';

interface HarvestData {
  crop: string;
  quantity: number;
  date: string;
}

const Harvest: React.FC = () => {
  const [crop, setCrop] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [harvestRecords, setHarvestRecords] = useState<HarvestData[]>([]);

  const handleAddHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: HarvestData = { crop, quantity, date };
    setHarvestRecords([...harvestRecords, newRecord]);
    setCrop('');
    setQuantity(0);
    setDate('');
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-success">Ghi nhận thu hoạch</h1>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-primary">Thêm sản lượng thu hoạch</Card.Title>
          <Form onSubmit={handleAddHarvest}>
            <Form.Group className="mb-3">
              <Form.Label>Cây trồng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên cây trồng"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sản lượng (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập sản lượng"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày thu hoạch</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Ghi nhận thu hoạch
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="text-primary">Danh sách thu hoạch</Card.Title>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Cây trồng</th>
                <th>Sản lượng (kg)</th>
                <th>Ngày thu hoạch</th>
              </tr>
            </thead>
            <tbody>
              {harvestRecords.map((record, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}>
                  <td>{record.crop}</td>
                  <td>{record.quantity}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Harvest;
