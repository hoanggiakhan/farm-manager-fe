import { LocalDate, LocalTime } from 'js-joda';
import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { AttendanceModel } from '../model/AttendanceModel';
import { checkIn, checkOut } from '../api/EmployeeApi';
import { getIdUserByToken } from '../utils/JwtService';
import { getAllAttendanceByUserId } from '../api/AttendanceApi';

const AttendanceToday: React.FC = () => {
  const userId = getIdUserByToken();
  const [attendances, setAttendances] = useState<AttendanceModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const isToday = (date: string) => LocalDate.parse(date).equals(LocalDate.now());
  const hasCheckedInToday = attendances.some((attendance) => isToday(attendance.date.toString()));

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const attendanceData = await getAllAttendanceByUserId(userId);
      setAttendances(attendanceData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Lỗi khi tải dữ liệu chấm công, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await checkIn(userId);
      fetchAttendances();
    } catch (error) {
      console.error(error);
      setError('Lỗi khi chấm công vào, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (attendanceId: string) => {
    setLoading(true);
    try {
      await checkOut(attendanceId);
      fetchAttendances(); // Update attendance list after successful check-out
    } catch (error) {
      console.error(error);
      setError('Lỗi khi chấm công ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center text-success">Danh sách chấm công</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" role="status" className="d-block mx-auto"><span className="sr-only">Loading...</span></Spinner>}
      
      <div className="text-center mb-3">
        <Button variant="primary" onClick={handleCheckIn} disabled={loading || hasCheckedInToday}>
          Chấm công vào
        </Button>
      </div>

      <Table responsive striped bordered hover className="mt-3">
        <thead className="bg-success text-white">
          <tr className='text-center'>
            <th>Ngày</th>
            <th>Thời gian vào</th>
            <th>Thời gian ra</th>
            <th>Công(ngày)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id} className='text-center'>
              <td>{new Date(attendance.date.toString()).toLocaleDateString()}</td>
              <td>{attendance.checkInTime ? attendance.checkInTime.toString() : 'Chưa chấm công'}</td>
              <td>{attendance.checkOutTime ? attendance.checkOutTime.toString() : 'Chưa chấm công'}</td>
              <td>{attendance.totalMerits}</td>
              <td>
                {!attendance.checkInTime ? (
                  <Button variant="secondary" size="sm" disabled>
                    Chưa chấm công
                  </Button>
                ) : !attendance.checkOutTime && isToday(attendance.date.toString()) ? (
                  <Button variant="primary" size="sm" onClick={() => handleCheckOut(attendance.id)} disabled={loading}>
                    Chấm công ra
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" disabled>
                    Đã hoàn tất
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AttendanceToday;
