import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface Employee {
  id: number;
  name: string;
  age: number;
  department: string;
  position: string;
  hireDate: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Nguyễn Văn A', age: 30, department: 'Kỹ thuật', position: 'Kỹ sư', hireDate: '2020-03-15' },
    { id: 2, name: 'Trần Thị B', age: 25, department: 'Kế toán', position: 'Kế toán viên', hireDate: '2021-07-21' },
  ]);

  const [show, setShow] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    name: '',
    age: 0,
    department: '',
    position: '',
    hireDate: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddEmployee = () => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
    handleClose();
  };

  return (
    <div>
      <h1>Quản lý nhân viên</h1>

      <Button variant="primary" onClick={handleShow} className="mb-3">
        Thêm nhân viên mới
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên nhân viên</th>
            <th>Tuổi</th>
            <th>Phòng ban</th>
            <th>Chức vụ</th>
            <th>Ngày vào làm</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.hireDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal để thêm nhân viên mới */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhân viên mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmployeeName">
              <Form.Label>Tên nhân viên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên nhân viên"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmployeeAge" className="mt-3">
              <Form.Label>Tuổi</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập tuổi"
                value={newEmployee.age}
                onChange={(e) => setNewEmployee({ ...newEmployee, age: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formEmployeeDepartment" className="mt-3">
              <Form.Label>Phòng ban</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phòng ban"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmployeePosition" className="mt-3">
              <Form.Label>Chức vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập chức vụ"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formHireDate" className="mt-3">
              <Form.Label>Ngày vào làm</Form.Label>
              <Form.Control
                type="date"
                value={newEmployee.hireDate}
                onChange={(e) => setNewEmployee({ ...newEmployee, hireDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
