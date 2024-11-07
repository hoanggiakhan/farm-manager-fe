import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { AttendanceModel } from "../../model/AttendanceModel";
import { totalSalary } from "../../api/EmployeeApi";
import { useDataContext } from "../../utils/DataContext";

interface SalaryModalProps {
    show: boolean;
    onHide: () => void;
    employeeName: string;
    onConfirm: (salary: number) => void;
    attendances: AttendanceModel[];
    employeeId: number;
    setShowSalaryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalaryModal: React.FC<SalaryModalProps> = ({ setShowSalaryModal, show, onHide, employeeName, onConfirm, attendances, employeeId }) => {
    const [hourlyRate, setHourlyRate] = useState<number | null>(null);
    const [allowance, setAllowance] = useState<number | null>(null);
    const [bonus, setBonus] = useState<number | null>(null);
    const [deductions, setDeductions] = useState<number | null>(null);
    const [calculatedSalary, setCalculatedSalary] = useState<number | null>(null);
    const [totalMerits, setTotalMerits] = useState<number>(0);
    const { fetchData } = useDataContext();

    useEffect(() => {
        const merits = attendances.reduce((sum, attendance) => sum + (attendance.totalMerits || 0), 0);
        setTotalMerits(merits);
    }, [attendances]);

    const formatCurrency = (value: number | null) => {
        return value !== null ? value.toLocaleString("vi-VN") : "";
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Only keep numeric characters
        setter(value ? Number(value) : null); // Convert to number or null if empty
    };

    const handleCalculateSalary = async () => {
        const salary =
            totalMerits * (hourlyRate || 0) + (allowance || 0) + (bonus || 0) - (deductions || 0);

        try {
            await totalSalary(employeeId, salary);
            alert("Tính lương thành công");
            setShowSalaryModal(false); // Close the modal
            fetchData(); // Reload data immediately
        } catch (error) {
            alert(`Lỗi khi tính lương: ${(error as Error).message}`);
        }

        setCalculatedSalary(salary);
        setHourlyRate(null);
        setAllowance(null);
        setBonus(null);
        setDeductions(null);
        onConfirm(salary);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tính lương cho {employeeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="hourlyRate" className="mb-3">
                        <Form.Label column sm={4}>Tiền công theo giờ</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tiền công"
                                value={formatCurrency(hourlyRate)}
                                onChange={handleInputChange(setHourlyRate)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="allowance" className="mb-3">
                        <Form.Label column sm={4}>Phụ cấp</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                placeholder="Nhập phụ cấp"
                                value={formatCurrency(allowance)}
                                onChange={handleInputChange(setAllowance)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="bonus" className="mb-3">
                        <Form.Label column sm={4}>Thưởng</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                placeholder="Nhập thưởng"
                                value={formatCurrency(bonus)}
                                onChange={handleInputChange(setBonus)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="deductions" className="mb-3">
                        <Form.Label column sm={4}>Khấu trừ</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                placeholder="Nhập khấu trừ"
                                value={formatCurrency(deductions)}
                                onChange={handleInputChange(setDeductions)}
                            />
                        </Col>
                    </Form.Group>
                    <p>Tổng công: {totalMerits} ngày</p>
                </Form>
                {calculatedSalary !== null && (
                    <div className="mt-3 text-center">
                        <strong>Lương tính được: {calculatedSalary.toLocaleString("vi-VN")} VND</strong>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleCalculateSalary}>Xác nhận</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SalaryModal;
