// import React from 'react';
// import { Row, Col, Card } from 'react-bootstrap';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const Dashboard: React.FC = () => {
//   const cropData = {
//     labels: ['January', 'February', 'March', 'April'],
//     datasets: [
//       {
//         label: 'Crop Yield',
//         data: [12, 19, 3, 5],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const employeeData = {
//     labels: ['Active', 'Inactive'],
//     datasets: [
//       {
//         label: 'Employee Status',
//         data: [230, 20],
//         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Row className="mb-4">
//         <Col md={3}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Crops</Card.Title>
//               <Card.Text>Yield: 5000kg</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Employees</Card.Title>
//               <Card.Text>Active: 230</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Schedule</Card.Title>
//               <Card.Text>Tasks: 35</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Inventory</Card.Title>
//               <Card.Text>Items: 120</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <h3>Crop Yield Chart</h3>
//           <Bar data={cropData} />
//         </Col>
//         <Col md={6}>
//           <h3>Employee Status</h3>
//           <Doughnut data={employeeData} />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="#">Farm Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Overview</Nav.Link>
            <Nav.Link href="#">Livestock</Nav.Link>
            <Nav.Link href="#">Crops</Nav.Link>
            <Nav.Link href="#">Equipment</Nav.Link>
            <Nav.Link href="#">Reports</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="bg-light sidebar">
            <Nav className="flex-column">
              <Nav.Link href="#">Overview</Nav.Link>
              <Nav.Link href="#">Livestock</Nav.Link>
              <Nav.Link href="#">Crops</Nav.Link>
              <Nav.Link href="#">Equipment</Nav.Link>
              <Nav.Link href="#">Reports</Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={10}>
            <Row>
              {/* Cards */}
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Livestock Count</Card.Title>
                    <Card.Text>120 Animals</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Crops Growth</Card.Title>
                    <Card.Text>70% ready for harvest</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Weather Forecast</Card.Title>
                    <Card.Text>Rain expected tomorrow</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Recent Activities</Card.Title>
                    <Card.Text>
                      - Harvested 100 kg of corn <br />
                      - Vaccinated livestock
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
