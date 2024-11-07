import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FarmIntro: React.FC = () => {
  return (
    <Container fluid style={{ padding: '3rem 0', backgroundColor: '#f9fafb' }}>
      <Row className="align-items-center text-center text-md-start">
        <Col md={6} className="order-2 order-md-1">
          <h1 style={{ fontWeight: 'bold', color: '#4caf50' }}>
            Chào mừng đến với Nông Trại Xanh
          </h1>
          <p style={{ color: '#555', fontSize: '1.1rem' }}>
            Trải nghiệm cuộc sống nông thôn đích thực với các hoạt động trồng trọt, chăm sóc vật nuôi,
            và tận hưởng không gian trong lành. Tất cả đều được thực hiện tự nhiên và bền vững.
          </p>
          <Button
            variant="success"
            size="lg"
            className="mt-3"
            style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
          >
           <Link to={'/app/dashboard'} className='nav-link'> Khám phá ngay</Link>
          </Button>
        </Col>
        <Col md={6} className="order-1 order-md-2">
          <Image
             src={'./../../../image/farm.webp'}
            fluid
            rounded
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="text-center">
          <Image
             src={'./../../../image/crop.webp'}
            roundedCircle
            width="150"
            style={{ marginBottom: '1rem' }}
          />
          <h3 style={{ color: '#4caf50', fontWeight: 600 }}>Nông sản sạch</h3>
          <p style={{ color: '#555' }}>
            Trồng trọt không hóa chất và thu hoạch theo mùa, mang đến sản phẩm an toàn và giàu dinh dưỡng.
          </p>
        </Col>
        <Col md={4} className="text-center">
          <Image
              src={'./../../../image/animal.webp'}
            roundedCircle
            width="150"
            style={{ marginBottom: '1rem' }}
          />
          <h3 style={{ color: '#4caf50', fontWeight: 600 }}>Vật nuôi hữu cơ</h3>
          <p style={{ color: '#555' }}>
            Chăm sóc vật nuôi một cách tự nhiên, không sử dụng thuốc tăng trưởng để tạo ra các sản phẩm chất lượng cao.
          </p>
        </Col>
        <Col md={4} className="text-center">
          <Image
             src={'./../../../image/power1.webp'}
            roundedCircle
            width="150"
            style={{ marginBottom: '1rem' }}
          />
          <h3 style={{ color: '#4caf50', fontWeight: 600 }}>Năng lượng xanh</h3>
          <p style={{ color: '#555' }}>
            Sử dụng năng lượng tái tạo và phương pháp bền vững nhằm bảo vệ môi trường và hệ sinh thái.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmIntro;
