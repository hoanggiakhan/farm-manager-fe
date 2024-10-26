import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TaskModel from "../../model/TaskModel";
import { useDataContext } from "../../utils/DataContext";
import EmployeeModel from "../../model/EmployeeModel";
import { getIdUserByToken } from "../../utils/JwtService";
import { getAllEmployee } from "../../api/EmployeeApi";
import Select from "react-select";
import AnimalModel from "../../model/AnimalModel";
import CropModel from "../../model/CropModel";
import { getAllAnimal } from "../../api/AnimalApi";
import { getAllCrop } from "../../api/CropApi";

interface TaskProps {
  show: boolean;
  newTask: TaskModel;
  setNewTask: any;
  handleClose: any;
  handleAddTask: any;
}

export const TaskModal: React.FC<TaskProps> = ({
  handleAddTask,
  show,
  newTask,
  handleClose,
  setNewTask,
}) => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [crops, setCrops] = useState<CropModel[]>([]);
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const userId = getIdUserByToken();
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  useEffect(() => {
    if (userId) {
      fetchData(); // Fetch data when component mounts or userId changes
    }
  }, [userId]);
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return; // Không làm gì nếu người dùng chưa đăng nhập
    }
    // Fetch Animal Data
    getAllAnimal(userId)
      .then((response) => {
        setAnimals(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    // Fetch Crop Data
    getAllCrop(userId)
      .then((response) => {
        setCrops(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId,fetchData]);

  useEffect(() => {
    getAllEmployee(userId)
      .then((response) => {
        setEmployees(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Chuyển đổi dữ liệu thành định dạng phù hợp với react-select
  const employeeOptions = employees.map((employee) => ({
    value: employee.fullName,
    label: employee.fullName,
  }));

  const animalOptions = animals.map((animal) => ({
    value: animal.animalId,
    label: animal.animalName,
  }));

  const cropOptions = crops.map((crop) => ({
    value: crop.cropName,
    label: crop.cropName,
  }));

  return (
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
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formTaskDescription" className="mt-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mô tả"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formTaskEmployee" className="mt-3">
            <Form.Label>Nhân viên chịu trách nhiệm</Form.Label>
            <Select
              options={employeeOptions}
              onChange={(selectedOption) =>
                setNewTask({ ...newTask, nameEmployee: selectedOption?.value })
              }
              isSearchable
              placeholder="Chọn nhân viên"
            />
          </Form.Group>

          <Form.Group controlId="formTaskAnimal" className="mt-3">
            <Form.Label>Chọn vật nuôi</Form.Label>
            <Select
              options={animalOptions}
              onChange={(selectedOption) =>
                setNewTask({
                  ...newTask,
                  animalName: selectedOption?.label, // Sử dụng label cho animalName
                  cropName: '', // Đặt lại cropName khi chọn vật nuôi
                })
              }
              isSearchable
              placeholder="Chọn vật nuôi"
            />
          </Form.Group>

          <Form.Group controlId="formTaskCrop" className="mt-3">
            <Form.Label>Chọn cây trồng</Form.Label>
            <Select
              options={cropOptions}
              onChange={(selectedOption) =>
                setNewTask({
                  ...newTask,
                  cropName: selectedOption?.label, // Sử dụng label cho cropName
                  animalName: '', // Đặt lại animalName khi chọn cây trồng
                })
              }
              isSearchable
              placeholder="Chọn cây trồng"
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
};
