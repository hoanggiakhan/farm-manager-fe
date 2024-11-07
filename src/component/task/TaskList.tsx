import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { getIdUserByToken } from '../../utils/JwtService';
import { addTask, deleteTask, getAllTask } from '../../api/TaskApi';
import TaskModel from '../../model/TaskModel';
import { TaskModal } from './TaskModal';
import { toast } from 'react-toastify';
import { useDataContext } from '../../utils/DataContext';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState<TaskModel>({
    taskId: 0,
    title: '',
    description: '',
    date: '',
    status: 0,
    nameEmployee: '',
    animalName: '',
    cropName: '',
  });
  const { fetchData } = useDataContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = getIdUserByToken(); // Lấy userId từ token

  const handleAddTask = () => {
    addTask(newTask, userId)
      .then(() => {
        alert('Thêm công việc thành công')
        // Gọi lại API để lấy danh sách mới sau khi thêm task
        getAllTask(userId)
          .then((updatedTasks) => setTasks(updatedTasks))
          .catch((error) => toast.error(`Lỗi khi tải danh sách: ${error.message}`));
        setNewTask({
          taskId: 0,
          title: '',
          description: '',
          date: '',
          status: 0,
          nameEmployee: '',
          animalName: '',
          cropName: '',
        }); // Đặt lại giá trị newTask
        setShow(false); // Ẩn modal sau khi thêm
        fetchData();
      })
      .catch((error) => {
        alert(`Lỗi khi thêm nhiệm vụ: ${error.message}`);
      });
  };

  useEffect(() => {
    getAllTask(userId)
      .then((response) => {
        setTasks(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId]); // Thêm userId vào danh sách phụ thuộc của useEffect

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId)
      .then(() => {
        setTasks((prevItems) => prevItems.filter((item) => item.taskId !== taskId)); // Cập nhật danh sách sau khi xóa
        alert('Xóa thành công');
      })
      .catch((error) => {
        alert(`Lỗi khi xóa nhiệm vụ: ${error.message}`);
      });
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Danh sách công việc</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleShow}>
            Thêm nhiệm vụ mới
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <th>Tên nhiệm vụ</th>
            <th>Mô tả</th>
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
              <td>{new Date(task.date).toLocaleDateString()}</td>
              <td style={{ color: task.status === 1 ? 'green' : 'orange' }}>
                {task.status === 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}
              </td>
              <td>
                {task.status === 1 ? (
                  <Button variant="success" onClick={() => handleDeleteTask(task.taskId)}>
                    Xác nhận
                  </Button>
                ) : (
                  <Button variant="danger" onClick={() => handleDeleteTask(task.taskId)}>
                    Xóa
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TaskModal
        show={show}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
        newTask={newTask}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default TaskList;
