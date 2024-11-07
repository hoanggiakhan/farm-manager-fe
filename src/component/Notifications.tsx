import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Badge, Container, Button, Alert } from 'react-bootstrap';
import { deleteAllNotifications, getAllNotification, markAsRead } from '../api/EmployeeApi';
import { getIdUserByToken } from '../utils/JwtService';
import { NotificationModel } from '../model/NotifiationModel';
import { useDataContext } from '../utils/DataContext';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const userId = getIdUserByToken();
  const { fetchData } = useDataContext();

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = () => {
    setLoading(true);
    getAllNotification(userId)
      .then((response) => {
        const sortedNotifications = response.sort(
          (a, b) => new Date(b.date.toString()).getTime() - new Date(a.date.toString()).getTime()
        );
        setNotifications(sortedNotifications);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };


  const handleDeleteAll = () => {
    deleteAllNotifications(userId)
      .then(() => {
        setNotifications([]);
        fetchData();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, status: 1 } : notif
          )
        );
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Thông báo</h1>
      <Button variant="danger" onClick={handleDeleteAll} className="mb-3">
        Xóa tất cả thông báo
      </Button>
      <Card>
        <Card.Body>
          <Card.Title>Các thông báo gần đây</Card.Title>
          {notifications.length === 0 ? (
            <Alert variant="info" className="text-center">
              Không có thông báo nào
            </Alert>
          ) : (
            <ListGroup>
              {notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={notification.status === 1 ? '' : 'font-weight-bold'}
                  onClick={() => handleMarkAsRead(notification.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {notification.content}{' '}
                  <Badge bg="secondary" className="float-end">
                    {new Date(notification.date.toString()).toLocaleDateString()}
                  </Badge>
                  {notification.status === 0 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="float-end me-2"
                      // Uncomment and implement handleDelete to enable delete functionality
                      // onClick={(e) => {
                      //   e.stopPropagation(); // Prevent triggering mark as read
                      //   handleDelete(notification.id);
                      // }}
                    >
                      Xóa
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Notifications;
