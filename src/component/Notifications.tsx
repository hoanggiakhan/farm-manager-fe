import React from 'react';
import { Card, ListGroup, Badge, Container } from 'react-bootstrap';

interface Notification {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
}

const Notifications: React.FC = () => {
  const notifications: Notification[] = [
    { id: 1, message: "Bạn đã hoàn thành công việc 'Tưới cây'.", date: "2024-10-01", isRead: false },
    { id: 2, message: "Có một báo cáo mới về tình trạng cây trồng.", date: "2024-10-05", isRead: true },
    { id: 3, message: "Đã thêm 20kg phân bón vào kho.", date: "2024-10-10", isRead: false },
    { id: 4, message: "Thời gian chăm sóc vật nuôi sắp đến.", date: "2024-10-12", isRead: true },
    { id: 5, message: "Cây trồng của bạn đang phát triển tốt.", date: "2024-10-15", isRead: false },
  ];

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Thông báo</h1>
      <Card>
        <Card.Body>
          <Card.Title>Các thông báo gần đây</Card.Title>
          <ListGroup>
            {notifications.map((notification) => (
              <ListGroup.Item key={notification.id} className={notification.isRead ? '' : 'font-weight-bold'}>
                {notification.message} <Badge bg="secondary" className="float-end">{notification.date}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Notifications;
