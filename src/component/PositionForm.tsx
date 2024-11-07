import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { RoleModel } from "../model/RoleModel";
import { getIdUserByToken } from "../utils/JwtService";
import { addRole } from "../api/EmployeeApi";

const PositionManagement: React.FC = () => {
  const [positions, setPositions] = useState<RoleModel[]>([]);
  const [newRole , setNewRole] = useState<RoleModel>({
    roleName : '',
    description : ''
  }
  )
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const userId = getIdUserByToken();
  // useEffect(() => {
  //   setLoading(true);
  //   getAllRole(userId)
  //     .then((response) => {
  //       setPositions(response);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false); // Gọi setLoading(false) để dừng trạng thái loading
  //     });
  // }, [userId]);
  
  // const handleAddPosition = () => {
  //   const newPosition: Position = {
  //     id: positions.length + 1,
  //     name: positionName,
  //     description: positionDescription,
  //   };
  //   setPositions([...positions, newPosition]);
  //   setPositionName("");
  //   setPositionDescription("");
  // };
   
  const handleAddRole = () => {
    addRole(userId, newRole)
      .then((response) => {
        // Thông báo thêm thành công
        alert('Thêm vị trí thành công');
        // Cập nhật state 'positions' với dữ liệu mới
        setPositions((prevPositions) => [
          ...prevPositions, 
          { id: newRole.roleName, ...newRole }  // Bạn có thể cần tự tạo `id` nếu cần
        ]);
        setNewRole({roleName:'' , description:''});
      })
      .catch((error) => {
        // Thông báo lỗi
        alert(`Lỗi khi thêm vị trí: ${error.message}`);
      });
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Danh sách vị trí</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formPositionName">
              <Form.Label>Vị trí</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên vị trí"
                value={newRole.roleName}
                onChange={(e) =>
                  setNewRole({ ...newRole, roleName: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPositionDescription">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mô tả"
                value={newRole.description}
                onChange={(e) =>
                  setNewRole({ ...newRole, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-center">
            <Button variant="primary" onClick={()=>handleAddRole()}>
             Thêm vị trí
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>Vị trí</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.roleName}>
              <td>{position.roleName}</td>
              <td>{position.description}</td>
              <td>
                  <Button variant="danger">Xóa</Button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PositionManagement;
