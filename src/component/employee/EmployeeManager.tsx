import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { getAllEmployee } from '../../api/EmployeeApi';
import EmployeeModel from '../../model/EmployeeModel';
import { getIdUserByToken } from '../../utils/JwtService';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
  }, []);

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
                <button className="btn delete-btn bg-danger">Xóa</button>
                <button className="btn edit-btn bg-warning ms-2">Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeManagement;
