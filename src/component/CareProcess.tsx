import React, { useState } from 'react';
import { Card, Form, Button, Table, Container, Row, Col } from 'react-bootstrap';

interface CareActivity {
  activity: string;
  date: string;
  notes: string;
}

const CareProcess: React.FC = () => {
  const [activity, setActivity] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [activities, setActivities] = useState<CareActivity[]>([]);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const newActivity: CareActivity = { activity, date, notes };
    setActivities([...activities, newActivity]);
    setActivity('');
    setDate('');
    setNotes('');
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-success">Theo dõi quy trình chăm sóc</h1>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-primary">Ghi nhận hoạt động chăm sóc</Card.Title>
          <Form onSubmit={handleAddActivity}>
            <Form.Group className="mb-3">
              <Form.Label>Hoạt động</Form.Label>
              <Form.Control
                as="select"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                required
              >
                <option value="">Chọn hoạt động</option>
                <option value="Tưới nước">Tưới nước</option>
                <option value="Bón phân">Bón phân</option>
                <option value="Cho ăn">Cho ăn</option>
                <option value="Tiêm phòng">Tiêm phòng</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày thực hiện</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập ghi chú"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Ghi nhận hoạt động
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="text-primary">Danh sách hoạt động chăm sóc</Card.Title>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Hoạt động</th>
                <th>Ngày thực hiện</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}>
                  <td>{act.activity}</td>
                  <td>{act.date}</td>
                  <td>{act.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CareProcess;
