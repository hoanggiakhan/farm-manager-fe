// components/Calendar.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getIdUserByToken } from '../utils/JwtService';
import { getAllTask } from '../api/TaskApi';
import TaskModel from '../model/TaskModel';

const Calendar: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const userId = getIdUserByToken();
  useEffect(() => {
    getAllTask(userId)
      .then((response) => {
       setTasks(response)
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
  return (
    <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>Công việc</th>
          <th>Tên cây/vật nuôi</th>
          <th>Ngày</th>
          <th>Người phụ trách</th>
        </tr>
      </thead>
      <tbody>
      {tasks.map((task) => {
            // const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Hoàn thành';
            return (
              // style={{ backgroundColor: isOverdue ? '#f8d7da' : 'white' }}
              <tr key={task.taskId} className='text-center'>
                <td>{task.title}</td>
                <td>{task.cropName===null && task.animalName===null ? ' ' : task.cropName === null ? `${task.animalName}` : `${task.cropName}`}</td>
                <td>{new Date(task.date).toLocaleDateString()}</td>
                <td>{task.nameEmployee}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default Calendar;
