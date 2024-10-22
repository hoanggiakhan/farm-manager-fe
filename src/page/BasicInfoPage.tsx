import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const BasicInfoPage: React.FC = () => {
  return (
    <Container fluid className="bg-light py-5">
      <Row className="text-center mb-5">
        <Col>
          <h3 className="text-success">Sản phẩm và dịch vụ</h3>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Cây trồng</Card.Title>
              <Card.Text>Rau củ, trái cây và các loại cây trồng nông sản khác.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Vật nuôi</Card.Title>
              <Card.Text>Gia súc, gia cầm và các vật nuôi khác được quản lý một cách chuyên nghiệp.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center mb-5">
        <Col>
          <h3 className="text-success">Lợi ích của việc sử dụng trang web</h3>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Text>
                Trang web quản lý nông trại giúp người dùng theo dõi và quản lý cây trồng, vật nuôi, cũng như doanh thu, từ đó tối ưu hóa sản lượng và nâng cao hiệu quả kinh doanh.
              </Card.Text>
              <Card.Text>
                Bên cạnh đó, người dùng còn có thể lập lịch làm việc, theo dõi sức khỏe của vật nuôi, và dự báo sản lượng cho mùa vụ tiếp theo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicInfoPage;
