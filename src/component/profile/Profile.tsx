import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { getUserById, updateEmployee, updateProfile } from '../../api/EmployeeApi';
import { getIdUserByToken } from '../../utils/JwtService';
import EmployeeModel from '../../model/EmployeeModel';
import { LocalDate } from 'js-joda';



const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [userData, setUserData] = useState<EmployeeModel>();
  const [editing, setEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState<EmployeeModel | null>(null);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const userId = getIdUserByToken();

  useEffect(() => {
    getUserById(userId)
      .then((response) => {
        setUserData(response);
        setTempUserData({
          fullName: response.fullName,
          email: response.email,
          phoneNumber: response.phoneNumber,
          age: response.age || 0,
          joinDate: response.joinDate || '',
          address : response.address,
          username : response.username,
          password : response.password,
          employeeId: response.employeeId,
          nameRole : response.nameRole,
          salary : response.salary,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (tempUserData) {
      setTempUserData({
        ...tempUserData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    if (tempUserData) {
      const updatedUserData: EmployeeModel = {
        ...tempUserData,
        joinDate: tempUserData.joinDate,
      };
  
      updateProfile(updatedUserData,userId)
        .then(() => {
          return getUserById(userId);
        })
        .then((response) => {
          setUserData(response);
          setEditing(false);
          setShowSaveAlert(true);
          setTimeout(() => setShowSaveAlert(false), 3000);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };
  

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Thông Tin Cá Nhân</h1>

      {showSaveAlert && (
        <Alert variant="success" onClose={() => setShowSaveAlert(false)} dismissible>
          Lưu thay đổi thành công!
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6} className="mx-auto">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={tempUserData?.fullName || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={tempUserData?.address || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="emailr"
                    name="email"
                    value={tempUserData?.email || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={tempUserData?.phoneNumber || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tuổi</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={tempUserData?.age || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ngày vào làm</Form.Label>
                  <Form.Control
                    type="text"
                    name="joinDate"
                    value={tempUserData?.joinDate.toString() || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={tempUserData?.username}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={tempUserData?.password}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <div className="text-center">
                  {editing ? (
                    <>
                      <Button variant="success" onClick={handleSave} className="me-2">
                        Lưu
                      </Button>
                      <Button variant="secondary" onClick={() => setEditing(false)}>
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => setEditing(true)}>
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
