import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import AttendanceModal from "./AttendanceModal";
import EmployeeModel from "../../model/EmployeeModel";
import { getIdUserByToken } from "../../utils/JwtService";
import { getAllEmployee } from "../../api/EmployeeApi";
import { getAllAttendanceByUserId } from "../../api/AttendanceApi";
import { AttendanceModel } from "../../model/AttendanceModel";
import SalaryModal from "./SalaryModal";
import { useDataContext } from "../../utils/DataContext";

const EmployeeAttendanceTable: React.FC = () => {
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel | null>(null);
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);
    const [attendances, setAttendances] = useState<AttendanceModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    const [showModal, setShowModal] = useState(false);
    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const { fetchData } = useDataContext();

    const userId = getIdUserByToken();

    // Hàm này lấy danh sách nhân viên từ server
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await getAllEmployee(userId);
            fetchData();
            setEmployees(response);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [userId]);

    const handleShowModal = async (employee: EmployeeModel) => {
        setSelectedEmployee(employee);
        setShowModal(true);
        setLoading(true);

        try {
            const attendanceData = await getAllAttendanceByUserId(employee.employeeId);
            setAttendances(attendanceData);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
        setAttendances([]);
        setShowModal(false);
    };

    const handleShowSalaryModal = async (employee: EmployeeModel) => {
        setSelectedEmployee(employee);
        setLoading(true);

        try {
            const attendanceData = await getAllAttendanceByUserId(employee.employeeId);
            setAttendances(attendanceData);
            setShowSalaryModal(true);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSalaryModal = () => {
        setSelectedEmployee(null);
        setShowSalaryModal(false);
        setAttendances([]);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Danh sách nhân viên</h2>
            {error && <Alert variant="danger">Đã xảy ra lỗi: {error.message}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Table responsive bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Tên nhân viên</th>
                            <th>Chức vụ</th>
                            <th>Lương tháng {new Date().getMonth() + 1}</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.employeeId} className="text-center">
                                <td>{employee.fullName}</td>
                                <td>{employee.nameRole}</td>
                                <td>{employee.salary.toLocaleString()}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowModal(employee)}
                                    >
                                        Xem
                                    </Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleShowSalaryModal(employee)}
                                        style={{ marginLeft: '4px' }}
                                    >
                                        Tính lương
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {selectedEmployee && (
                <AttendanceModal
                    show={showModal}
                    onHide={handleCloseModal}
                    employeeName={selectedEmployee.fullName}
                    attendances={attendances}
                />
            )}
            {selectedEmployee && (
                <SalaryModal
                    show={showSalaryModal}
                    onHide={handleCloseSalaryModal}
                    employeeName={selectedEmployee.fullName}
                    employeeId={selectedEmployee.employeeId}
                    onConfirm={() => fetchEmployees()} // Cập nhật danh sách sau khi tính lương
                    attendances={attendances}
                    setShowSalaryModal={setShowSalaryModal}
                />
            )}
        </div>
    );
};

export default EmployeeAttendanceTable;
