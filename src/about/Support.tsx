import React from 'react';
import { Card, ListGroup, Container, Row, Col, Form, Button } from 'react-bootstrap';

const Support: React.FC = () => {
  const faqs = [
    { question: "Làm thế nào để thêm cây trồng mới?", answer: "Bạn có thể thêm cây trồng mới thông qua trang 'Quản lý cây trồng'." },
    { question: "Tôi có thể xuất báo cáo từ đâu?", answer: "Báo cáo có thể được xuất từ trang 'Báo cáo'." },
    { question: "Liên hệ với bộ phận hỗ trợ như thế nào?", answer: "Bạn có thể gửi email cho chúng tôi tại support@example.com." },
  ];

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Hỗ trợ</h1>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Thông tin liên hệ</Card.Title>
              <Card.Text>
                Nếu bạn cần hỗ trợ kỹ thuật, vui lòng liên hệ với chúng tôi qua email hoặc điện thoại:
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> support@example.com<br />
                <strong>Điện thoại:</strong> +84 123 456 789
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Gửi yêu cầu hỗ trợ</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control type="text" placeholder="Nhập tên của bạn" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Nhập email của bạn" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Mô tả yêu cầu hỗ trợ" required />
                </Form.Group>
                <Button variant="primary" type="submit">Gửi yêu cầu</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Câu hỏi thường gặp (FAQ)</Card.Title>
          <ListGroup>
            {faqs.map((faq, index) => (
              <ListGroup.Item key={index}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Support;
