import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ListGroup>
        <ListGroup.Item action href="#crops">Crops Management</ListGroup.Item>
        <ListGroup.Item action href="#employees">Employee Management</ListGroup.Item>
        <ListGroup.Item action href="#schedule">Schedule</ListGroup.Item>
        <ListGroup.Item action href="#inventory">Inventory</ListGroup.Item>
        <ListGroup.Item action href="#inventory">Inventory</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
