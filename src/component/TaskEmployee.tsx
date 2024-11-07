import React, { useEffect, useState } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import TaskModel from '../model/TaskModel';
import {  completeTask, getAllTaskEmployee } from '../api/EmployeeApi';
import { getIdUserByToken } from '../utils/JwtService';

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const userId = getIdUserByToken();
  
  useEffect(() => {
    getAllTaskEmployee(userId)
      .then((response) => {
        setTasks(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId]);

  const handleComplete = (taskId: number) => {
    completeTask(taskId)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskId === taskId ? { ...task, status: 1 } : task
          )
        );
      })
      .catch((error : any) => {
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-center text-success">Danh sách công việc</h2>
      <Table responsive striped bordered hover className="mt-3">
        <thead className="bg-success text-white">
          <tr className='text-center'>
            <th>Tên nhiệm vụ</th>
            <th>Mô tả</th>
            <th>Tên vật nuôi/Cây trồng</th>
            <th>Hạn chót</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskId} className='text-center'>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.cropName || task.animalName || ''}</td>
              <td>{new Date(task.date).toLocaleDateString()}</td>
              <td>
                <Badge bg={task.status === 1 ? 'success' : 'warning'}>
                  {task.status === 1 ? "Hoàn thành" : "Chưa hoàn thành"}
                </Badge>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={task.status === 1}
                  onClick={() => handleComplete(task.taskId)}
                >
                  Hoàn thành
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskTable;
