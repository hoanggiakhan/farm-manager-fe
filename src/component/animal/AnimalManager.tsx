import React, { ReactNode, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { getAllAnimal } from '../../api/AnimalApi';
import AnimalModel from '../../model/AnimalModel';
import { getIdUserByToken } from '../../utils/JwtService';
import { useDataContext } from '../../utils/DataContext';

// interface Animal {
//   id: number;
//   name: string;
//   type: string;
//   quantity: number;
//   age: number;
//   healthStatus: string;
// }

const AnimalManagement: React.FC = () => {
  // const [animals, setAnimals] = useState<Animal[]>([
  //   { id: 1, name: 'Bò sữa A', type: 'Bò sữa', quantity: 5, age: 3, healthStatus: 'Tốt' },
  //   { id: 2, name: 'Gà mái B', type: 'Gà mái', quantity: 20, age: 1, healthStatus: 'Khá' },
  //   { id: 3, name: 'Heo thịt C', type: 'Heo thịt', quantity: 15, age: 2, healthStatus: 'Tốt' },
  // ]);

  // const [search, setSearch] = useState('');
  // const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(animals);
  const [show, setShow] = useState(false);
  // const [newAnimal, setNewAnimal] = useState<Animal>({
  //   id: 0,
  //   name: '',
  //   type: '',
  //   quantity: 0,
  //   age: 0,
  //   healthStatus: 'Tốt',
  // });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleAddAnimal = () => {
  //   setAnimals([...animals, { ...newAnimal, id: animals.length + 1 }]);
  //   handleClose();
  // };

  // const handleDeleteAnimal = (id: number) => {
  //   setAnimals(animals.filter(animal => animal.id !== id));
  // };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   setSearch(searchTerm);
  //   setFilteredAnimals(
  //     animals.filter(animal =>
  //       animal.name.toLowerCase().includes(searchTerm) ||
  //       animal.type.toLowerCase().includes(searchTerm) ||
  //       animal.healthStatus.toLowerCase().includes(searchTerm) ||
  //       animal.age.toString().includes(searchTerm)
  //     )
  //   );
  // };
  const{animals , loading , error} = useDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const filteredEmployees = animals.filter(animals => {
  //   const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
  //   return (
  //     fullName.includes(searchTerm.toLowerCase()) ||
  //     employee.age.toString().includes(searchTerm)
  //   );
  // });
  return (
    <div className="container mt-5">
      <h1 className="text-center text-success">Quản lý vật nuôi</h1>

      {/* Tìm kiếm/Lọc */}
      {/* <div className="input-group mb-3">
        <FormControl
          placeholder="Tìm kiếm theo tên, loại, tuổi hoặc tình trạng sức khỏe"
          value={search}
          onChange={handleSearch}
          className="mr-2"
        />
        <Button variant="success" onClick={handleShow}>
          Thêm vật nuôi mới
        </Button>
      </div> */}

      <Table striped bordered hover variant="light">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Tên vật nuôi</th>
            {/* <th>Loại</th> */}
            <th>Số lượng</th>
            <th>Giá nhập</th>
            <th>Ngày mua</th>
            <th>Tuổi</th>
            <th>Tình trạng sức khỏe</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.animalId}>
              <td>{animal.animalId}</td>
              <td>{animal.animalName}</td>
              {/* <td>{animal.type}</td> */}
              <td>{animal.quantity}</td>
              <td>{animal.importPrice.toLocaleString()}</td>
              <td>{new Date(animal.buyDate).toLocaleDateString()}</td>
              <td>{animal.age}</td>
              <td>{animal.status===1 ? "Tốt" : "Khá"}</td>
              <td>
                <Button variant="danger">
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal để thêm vật nuôi mới */}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm vật nuôi mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAnimalName">
              <Form.Label>Tên vật nuôi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên vật nuôi"
                value={newAnimal.name}
                onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAnimalType" className="mt-3">
              <Form.Label>Loại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập loại vật nuôi"
                value={newAnimal.type}
                onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAnimalQuantity" className="mt-3">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số lượng"
                value={newAnimal.quantity}
                onChange={(e) => setNewAnimal({ ...newAnimal, quantity: parseInt(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formAnimalAge" className="mt-3">
              <Form.Label>Tuổi</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập tuổi"
                value={newAnimal.age}
                onChange={(e) => setNewAnimal({ ...newAnimal, age: parseInt(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formAnimalHealthStatus" className="mt-3">
              <Form.Label>Tình trạng sức khỏe</Form.Label>
              <Form.Control
                as="select"
                value={newAnimal.healthStatus}
                onChange={(e) => setNewAnimal({ ...newAnimal, healthStatus: e.target.value })}
              >
                <option value="Tốt">Tốt</option>
                <option value="Khá">Khá</option>
                <option value="Yếu">Yếu</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="success" onClick={handleAddAnimal}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AnimalManagement;
