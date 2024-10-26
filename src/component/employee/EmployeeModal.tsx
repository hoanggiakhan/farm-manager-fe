import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getAllRole } from '../../api/FarmApi';
import { getIdUserByToken } from '../../utils/JwtService';
import { RoleModel } from '../../model/RoleModel';
import EmployeeModel from '../../model/EmployeeModel';
import { LocalDate } from 'js-joda';
import { addEmployee, getAllEmployee } from '../../api/EmployeeApi';
import { checkExistEmail, checkExistUsername } from '../../utils/Validation';
import { useDataContext } from '../../utils/DataContext';
interface EmployeeModalProps {
    showEditModal: any,
    setShowEditModal: any,
    handleCloseAddModal: any,
    setEmployees: any,
    employees: EmployeeModel[],
}
const AddEmployeeModal: React.FC<EmployeeModalProps> = ({ showEditModal, handleCloseAddModal, setEmployees, setShowEditModal, employees }) => {
    const { fetchData } = useDataContext(); // Lấy hàm từ context
    const [roles, setRoles] = useState<RoleModel[]>([]); // State để lưu danh sách các vị trí
    const [newEmployee, setNewEmployee] = useState<EmployeeModel>({
        employeeId: 0,
        fullName: '',
        username: '',
        password: '',
        address: '',
        phoneNumber: '',
        email: '',
        age: 0,
        nameRole: '',
        joinDate: LocalDate.now(),
    });
    const handleSaveEmployee = () => {
        addEmployee(userId, newEmployee)
            .then(() => {
                alert('Thêm thành công');
                // Gọi lại dữ liệu từ cơ sở dữ liệu
                return getAllEmployee(userId);
            })
            .then((updatedEmployees) => {
                // Cập nhật state 'employees' với dữ liệu mới từ cơ sở dữ liệu
                fetchData();
                setEmployees(updatedEmployees);
                setShowEditModal(false); // Ẩn modal sau khi thêm
                setNewEmployee({
                    employeeId: 0,
                    fullName: '',
                    username: '',
                    password: '',
                    address: '',
                    phoneNumber: '',
                    email: '',
                    age: 0,
                    nameRole: '',
                    joinDate: LocalDate.now(),
                });
            })
            .catch((error) => {
                alert(`Lỗi khi thêm nhân viên: ${error.message}`);
            });
    };
    

    const userId = getIdUserByToken();
    useEffect(() => {
        getAllRole(userId)
            .then((response) => {
                setRoles(response);
            })
            .catch((error) => {
            });
    }, [userId]);

    const handleInputChange = (e: any) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Modal show={showEditModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm nhân viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Tên nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Nhập tên nhân viên"
                            value={newEmployee.fullName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            value={newEmployee.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={newEmployee.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            value={newEmployee.address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={newEmployee.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAge">
                        <Form.Label>Tuổi</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            placeholder="Nhập tuổi"
                            value={newEmployee.age}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formJoinDate">
                        <Form.Label>Ngày gia nhập</Form.Label>
                        <Form.Control
                            type="date" // Sử dụng type="text" để cho phép định dạng dd/mm/yyyy
                            name="joinDate"
                            value={newEmployee.joinDate.toString()} // Hiển thị ngày đã được chuyển đổi
                            onChange={handleInputChange}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNameRole">
                        <Form.Label>Vai trò</Form.Label>
                        <Form.Select
                            name="nameRole"
                            value={newEmployee.nameRole}
                            onChange={handleInputChange}
                        >
                            <option value="">Chọn vai trò</option>
                            {roles.map((role) => (
                                <option key={role.roleName} value={role.roleName}>
                                    {role.roleName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => handleSaveEmployee()}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEmployeeModal;
