import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FarmRequest } from '../model/FarmRequest';
import { addFarm } from '../api/FarmApi';
import { useNavigate } from 'react-router-dom';

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
        alert('Đăng ký thành công');
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
          <h3 className="text-center mb-4">Farm Registration</h3>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
            <Form.Group controlId="farmName" className="mb-3">
              <Form.Label>Farm Name</Form.Label>
              <Form.Control
                type="text"
                name="farmName"
                placeholder="Enter farm name"
                value={farm.farmName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="addressFarm" className="mb-3">
              <Form.Label>Farm Address</Form.Label>
              <Form.Control
                type="text"
                name="addressFarm" // Đồng nhất với state
                placeholder="Enter farm address"
                value={farm.addressFarm}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={farm.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber" // Đồng nhất với state
                placeholder="Enter phone number"
                value={farm.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>User Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter your address"
                value={farm.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={farm.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
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
              <Form.Label>Password</Form.Label>
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
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmRegistrationForm;
