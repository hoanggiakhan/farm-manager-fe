import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BasicInfoPage from './BasicInfoPage';
import { Link, useNavigate } from 'react-router-dom';
// import './HomePage.css'; // Để tùy chọn thêm CSS nếu cần

const HomePage: React.FC = () => {
//   const handleLogin = () => {
//     // Điều hướng tới trang đăng nhập
//   };
  
  const handleRegister = () => {
    // Điều hướng tới trang đăng ký
  };
const navigate = useNavigate(); // Hook dùng để điều hướng

  const handleLogin = () => {
    navigate('/login'); // Điều hướng tới trang đăng nhập
  };
  return (
    <Container fluid className="home-page bg-warning text-dark">
      <header className="text-center py-5">
        <h1 className="text-success">Chào mừng đến với hệ thống quản lý nông trại</h1>
        <p className="lead">Quản lý cây trồng, vật nuôi và doanh thu một cách dễ dàng và hiệu quả.</p>
      </header>

      <Row className="text-center my-4">
        <Col>
          <img
            src={'./../../../image/farm.png'}
            alt="Nông trại"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '80%' }}
          />
        </Col>
      </Row>

      <Row className="text-center my-5">
        <Col>
          <Button
            variant="success"
            className="mx-2"
            size="lg"
          >
            <Link
            to={'/login'}
            className='nav-link'
          >
            Đăng Nhập
          </Link>
          </Button>
          <Button
            variant="success"
            className="mx-2"
            size="lg"
            onClick={handleRegister}
          >
           <Link to={'/register'} className='nav-link'>
           Đăng ký thông tin nông trại
           </Link>
          </Button>
        </Col>
      </Row>
      <BasicInfoPage/>
    </Container>
  );
};

export default HomePage;
