// src/components/AttendanceModal.tsx

import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { AttendanceModel } from "../../model/AttendanceModel";

interface AttendanceModalProps {
    show: boolean;
    onHide: () => void;
    employeeName: string;
    attendances: AttendanceModel[];
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({
    show,
    onHide,
    employeeName,
    attendances,
}) => {
    // Tính tổng công bằng cách cộng tất cả giá trị của `totalMerits`
    const totalMeritsSum = attendances.reduce((sum, attendance) => sum + (attendance.totalMerits || 0), 0);

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chấm công của {employeeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Thời gian vào</th>
                            <th>Thời gian ra</th>
                            <th>Công (ngày)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.map((attendance) => (
                            <tr key={attendance.id}>
                                <td>{new Date(attendance.date.toString()).toLocaleDateString()}</td>
                                <td>{attendance.checkInTime?.toString()}</td>
                                <td>{attendance.checkOutTime?.toString()}</td>
                                <td>{attendance.totalMerits}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <div className="me-auto">
                    <strong>Tổng công trong tháng: {totalMeritsSum}</strong>
                </div>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AttendanceModal;
