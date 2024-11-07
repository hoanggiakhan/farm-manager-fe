import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FarmRequest } from '../model/FarmRequest';
import { addFarm } from '../api/FarmApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDataContext } from '../utils/DataContext';

const FarmRegistrationForm: React.FC = () => {
    const navigation = useNavigate();
  const [farm, setFarm] = useState<FarmRequest>({
    farmName: '',
    addressFarm: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    email: '',
    username: '',
    password: ''
  });
   const {fetchData} = useDataContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarm({
      ...farm,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn hành động submit mặc định
    addFarm(farm)
      .then(() => {
       alert('Đăng ký thành công')
       fetchData();
        navigation('/login')
      })
      .catch((error) => {
        alert(`Lỗi khi thêm farm: ${error.message}`);
      });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Đăng ký thông tin nông trại</h3>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
            <Form.Group controlId="farmName" className="mb-3">
              <Form.Label>Tên nông trại<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="text"
                name="farmName"
                placeholder="Tên nông trại"
                value={farm.farmName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="addressFarm" className="mb-3">
              <Form.Label>Địa chỉ nông trại<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="text"
                name="addressFarm" // Đồng nhất với state
                placeholder="Địa chỉ nông trại"
                value={farm.addressFarm}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Họ và tên quản lý<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Họ và tên quản lý"
                value={farm.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber" // Đồng nhất với state
                placeholder="Số điện thoại"
                value={farm.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Địa chỉ<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={farm.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={farm.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={farm.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password<span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={farm.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" className="w-25">
                Đăng ký
              </Button>
           <Button variant="primary" type="submit" className="w-25" style={{ marginLeft: '4px' }}>
           <Link to={'/'} className='text-white nav-link'>Home</Link>
           </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmRegistrationForm;
