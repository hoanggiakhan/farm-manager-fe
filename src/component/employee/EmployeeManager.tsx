import React, { useEffect, useState } from 'react';
import { Table, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { addEmployee, deleteEmployee, getAllEmployee } from '../../api/EmployeeApi';
import EmployeeModel from '../../model/EmployeeModel';
import { getIdUserByToken } from '../../utils/JwtService';
import AddEmployeeModal from './EmployeeModal';
import { LocalDate } from 'js-joda';
import { useDataContext } from '../../utils/DataContext';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel | null>(null);
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  
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
      employee.age.toString().includes(searchTerm) || employee.employeeId.toString().includes(searchTerm)
    );
  });

  const handleDeleteEmployee = (employeeId: number) => {
    deleteEmployee(employeeId)
      .then(() => {
        alert('Xóa thành công');
        setEmployees((prevItems) => prevItems.filter(item => item.employeeId !== employeeId)); // Cập nhật danh sách
        fetchData();
      })
      .catch((error) => {
        alert(`Lỗi khi xóa nhân viên: ${error.message}`);
      });
  };

  const handleEditEmployee = (employee: EmployeeModel) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };  
  const handleShowModal = ()=>{
    setShowEditModal(true);
  }
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

 

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Danh sách nhân viên</h1>
    
      <InputGroup className="mb-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên,tuổi,mã nhân viên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover variant="light">
        <thead className="table-primary">
          <tr className='text-center'>
            <th>Tên nhân viên</th>
            <th>Chức vụ</th>
            <th>Tuổi</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Ngày vào làm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index} className='text-center'>
              <td>{employee.fullName}</td>
              <td>{employee.nameRole === "EMPLOYEE" ? 'Chủ nôn trại' : 'Nhân viên'}</td>
              <td>{employee.age}</td>
              <td>{employee.address}</td>
              <td>{employee.phoneNumber}</td>
              <td>{new Date(employee.joinDate.toString()).toLocaleDateString()}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteEmployee(employee.employeeId)}>Xóa</Button>
                <Button variant="warning" className="ms-2" onClick={() => handleEditEmployee(employee)}>Sửa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
         
      <Button variant="primary" className="mb-3" onClick={()=>handleShowModal()}>
       Thêm nhân viên
      </Button>
     
     <AddEmployeeModal
      showEditModal={showEditModal}
      setShowEditModal={setShowEditModal}
      handleCloseAddModal={handleCloseEditModal}
      setEmployees={setEmployees}
      employees={employees}
      selectedEmployee={selectedEmployee}
     />
    </div>
  );
};

export default EmployeeManagement;
