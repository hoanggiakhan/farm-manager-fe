import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { getIdUserByToken } from '../../utils/JwtService';
import { getAllTask } from '../../api/TaskApi';
import TaskModel from '../../model/TaskModel';
import { TaskModal } from './TaskModal';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   dueDate: string;
//   status: string;
// }

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState<TaskModel>({
    taskId : 0,
    title : '',
    description : '',
    date : '',
    status : 0,
   nameEmployee : '',
  });
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddTask = () => {
    // if (newTask.title && newTask.description && newTask.dueDate) {
    //   setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    //   handleClose();
    // } else {
    //   alert('Vui lòng điền đầy đủ thông tin!');
    // }
  };

  // const handleCompleteTask = (id: number) => {
  //   setTasks(tasks.map(task => task.id === id ? { ...task, status: 'Hoàn thành' } : task));
  // };

  // const handleDeleteTask = (id: number) => {
  //   setTasks(tasks.filter(task => task.id !== id));
  // };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Quản lý Task List</h1>
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
          <tr>
            <th>Tên nhiệm vụ</th>
            <th>Mô tả</th>
            <th>Hạn chót</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            // const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Hoàn thành';
            return (
              // style={{ backgroundColor: isOverdue ? '#f8d7da' : 'white' }}
              <tr key={task.taskId}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.date).toLocaleDateString()}</td>
                <td style={{ color: task.status === 1 ? 'green' : 'orange' }}>{task.status === 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}</td>
                <td>
                {/* onClick={() => handleCompleteTask(task.id)} disabled={task.status === 'Hoàn thành'} */}
                  {/* <Button variant="success">
                    Hoàn thành
                  </Button>{' '} */}
                  {/* onClick={() => handleDeleteTask(task.id)} */}
                  <Button variant="danger">
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Modal để thêm nhiệm vụ mới */}
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
