import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { getUserById } from '../../api/EmployeeApi';
import { getIdUserByToken } from '../../utils/JwtService';
import EmployeeModel from '../../model/EmployeeModel';

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  // profilePicture: string;
  age: number;
  joinDate: string;
}

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [userData, setUserData] = useState<EmployeeModel | null>(null);
  const [editing, setEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState<UserProfileData | null>(null);
  const userId = getIdUserByToken();

  useEffect(() => {
    getUserById(userId)
      .then((response) => {
        setUserData(response);
        setTempUserData({
          name: `${response.lastName} ${response.firstName}`,
          email: response.address,
          phone: response.phoneNumber,
          // profilePicture: response.profilePicture || '',
          age: response.age || 0,
          joinDate: response.joinDate || '',
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

  // const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       if (tempUserData) {
  //         setTempUserData({
  //           ...tempUserData,
  //           profilePicture: event.target.result,
  //         });
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleSave = () => {
    if (tempUserData) {
      setUserData({
        ...userData!,
        lastName: tempUserData.name.split(' ')[0],
        firstName: tempUserData.name.split(' ')[1],
        address: tempUserData.email,
        phoneNumber: tempUserData.phone,
        // profilePicture: tempUserData.profilePicture,
        age: tempUserData.age,
        joinDate: tempUserData.joinDate,
      });
      setEditing(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Profile Người Dùng</h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            {/* <Col md={4} className="text-center">
              <img
                src={tempUserData?.profilePicture}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ maxWidth: '150px', height: 'auto' }}
              />
              {editing && (
                <Form.Group>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </Form.Group>
              )}
            </Col> */}
            <Col md={8}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={tempUserData?.name || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="email"
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
                    value={tempUserData?.phone || ''}
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
                    value={tempUserData?.joinDate || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                  />
                </Form.Group>

                {editing ? (
                  <Button variant="success" onClick={handleSave}>
                    Lưu thay đổi
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setEditing(true)}>
                    Chỉnh sửa
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
