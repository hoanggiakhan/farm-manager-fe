import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Error403: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container 
      className="d-flex vh-100 align-items-center justify-content-center bg-light text-dark"
    >
      <Row className="text-center">
        <Col>
          <h1 className="display-1 text-danger fw-bold">403</h1>
          <h2 className="mb-3 fw-semibold">Access Denied</h2>
          <p className="mb-4 fs-5">
            You don’t have permission to view this page.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Go to Homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Error403;
