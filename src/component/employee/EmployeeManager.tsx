import React, { useEffect, useState } from 'react';
import { Table, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { deleteEmployee, getAllEmployee } from '../../api/EmployeeApi';
import EmployeeModel from '../../model/EmployeeModel';
import { getIdUserByToken } from '../../utils/JwtService';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel | null>(null);

  const userId = getIdUserByToken();

  useEffect(() => {
    getAllEmployee(userId)
      .then((response) => {
        setEmployees(response);
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

  const filteredEmployees = employees.filter(employee => {
    const fullName = employee.fullName.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      employee.age.toString().includes(searchTerm)
    );
  });

  const handleDeleteEmployee = (employeeId: number) => {
    deleteEmployee(employeeId)
      .then(() => {
        setEmployees((prevItems) => prevItems.filter(item => item.employeeId !== employeeId)); // Cập nhật danh sách
        alert('Xóa thành công');
      })
      .catch((error) => {
        alert(`Lỗi khi xóa nhân viên: ${error.message}`);
      });
  };

  const handleEditEmployee = (employee: EmployeeModel) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleSaveEdit = () => {
    // Thêm logic cập nhật thông tin nhân viên tại đây (API call)
    setShowEditModal(false);
    alert('Lưu thành công');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Quản lý nhân viên</h1>
      {/* Thanh tìm kiếm */}
      <InputGroup className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên hoặc tuổi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover variant="light">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Tên nhân viên</th>
            <th>Tuổi</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Ngày vào làm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employeeId}</td>
              <td>{employee.fullName}</td>
              <td>{employee.age}</td>
              <td>{employee.address}</td>
              <td>{employee.phoneNumber}</td>
              <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteEmployee(employee.employeeId)}>Xóa</Button>
                <Button variant="warning" className="ms-2" onClick={() => handleEditEmployee(employee)}>Sửa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
         
      <Button variant="primary" className="mb-3">
       Thêm nhân viên
      </Button>
      {/* Modal chỉnh sửa nhân viên */}
      {selectedEmployee && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formFullName">
                <Form.Label>Tên nhân viên</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedEmployee.fullName}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fullName: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Tuổi</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedEmployee.age}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, age: parseInt(e.target.value) })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedEmployee.address}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedEmployee.phoneNumber}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phoneNumber: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeManagement;
