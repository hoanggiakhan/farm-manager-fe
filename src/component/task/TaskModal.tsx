import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ItemModel from "../../model/ItemModel";
import TaskModel from "../../model/TaskModel";
interface TaskProps{
    show : any;
    setShow : any;
    newTask : TaskModel;
    setNewTask : any;
    handleClose : any;
    handleShow : any;
    handleAddTask : any;
}
export const TaskModal : React.FC<TaskProps> = ({handleAddTask,show,newTask,handleClose,setNewTask,})=>{
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm nhiệm vụ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Tên nhiệm vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên nhiệm vụ"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTaskDescription" className="mt-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTaskDueDate" className="mt-3">
              <Form.Label>Hạn chót</Form.Label>
              <Form.Control
                type="date"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    );
}