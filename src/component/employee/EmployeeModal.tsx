import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getIdUserByToken } from '../../utils/JwtService';
import { RoleModel } from '../../model/RoleModel';
import EmployeeModel from '../../model/EmployeeModel';
import { addEmployee, getAllEmployee, updateEmployee } from '../../api/EmployeeApi';
import { useDataContext } from '../../utils/DataContext';
import { LocalDate } from 'js-joda';

interface EmployeeModalProps {
    showEditModal: boolean;
    setShowEditModal: (show: boolean) => void;
    handleCloseAddModal: () => void;
    setEmployees: React.Dispatch<React.SetStateAction<EmployeeModel[]>>;
    employees: EmployeeModel[];
    selectedEmployee: EmployeeModel | null;
}

const AddEmployeeModal: React.FC<EmployeeModalProps> = ({
    showEditModal,
    handleCloseAddModal,
    setEmployees,
    setShowEditModal,
    employees,
    selectedEmployee
}) => {
    const { fetchData } = useDataContext();
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [employeeData, setEmployeeData] = useState<EmployeeModel>({
        employeeId: 0,
        fullName: '',
        username: '',
        password: '',
        address: '',
        phoneNumber: '',
        email: '',
        age: 0,
        nameRole: '',
        salary: 0,
        joinDate: LocalDate.now(),
    });

    useEffect(() => {
        if (selectedEmployee) {
            setEmployeeData(selectedEmployee);
        } else {
            setEmployeeData({
                employeeId: 0,
                fullName: '',
                username: '',
                password: '',
                address: '',
                phoneNumber: '',
                email: '',
                age: 0,
                nameRole: '',
                salary: 0,
                joinDate: LocalDate.now(),
            });
        }
    }, [selectedEmployee]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: name === "salary" ? Number(value) : value, // Cập nhật salary dưới dạng số
        });
    };

    const handleSaveEmployee = async () => {
        const userId = getIdUserByToken();
        try {
            if (selectedEmployee) {
                await updateEmployee({ ...employeeData, joinDate: employeeData.joinDate });
                alert('Cập nhật thành công');
            } else {
                await addEmployee(userId, { ...employeeData, joinDate: employeeData.joinDate });
                alert('Thêm thành công');
            }

            const updatedEmployees = await getAllEmployee(userId);
            fetchData();
            setEmployees(updatedEmployees);
            setShowEditModal(false);
        } catch (error) {
            alert(`Lỗi khi ${selectedEmployee ? 'cập nhật' : 'thêm'} nhân viên: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    return (
        <Modal show={showEditModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Tên nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Nhập tên nhân viên"
                            value={employeeData.fullName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            value={employeeData.username}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={employeeData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSalary">
                        <Form.Label>Lương</Form.Label>
                        <Form.Control
                            type="number"
                            name="salary"
                            placeholder="Nhập lương"
                            value={employeeData.salary.toString()} // Hiển thị salary dưới dạng chuỗi
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            value={employeeData.address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={employeeData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAge">
                        <Form.Label>Tuổi</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            placeholder="Nhập tuổi"
                            value={employeeData.age}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formJoinDate">
                        <Form.Label>Ngày gia nhập</Form.Label>
                        <Form.Control
                            type="date"
                            name="joinDate"
                            value={employeeData.joinDate.toString()}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={employeeData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>Hủy</Button>
                <Button variant="primary" onClick={handleSaveEmployee}>
                    {selectedEmployee ? 'Lưu thay đổi' : 'Lưu'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEmployeeModal;
