// components/Dashboard.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import Cards from './Cards';
import ChartComponent from './Chart';
import Calendar from './Calendar';
import CropModel from '../model/CropModel';
import AnimalModel from '../model/AnimalModel';

const Dashboard: React.FC = () => {
  
  return (
    <Container fluid>
      <h2 className="my-4">Dashboard</h2>
      <Cards/>
      {/* <div className="my-4">
        <h4>Biểu đồ diện tích cây trồng</h4>
        <ChartComponent />
      </div> */}
      <div className="my-4">
        <h4>Lịch công việc</h4>
        <Calendar />
      </div>
    </Container>
  );
};

export default Dashboard;
