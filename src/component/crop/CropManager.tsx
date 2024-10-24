import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { deleteCrop, getAllCrop, getAllCropFarm } from '../../api/CropApi';
import CropModel from '../../model/CropModel';
import { getIdUserByToken, getUsernameByToken } from '../../utils/JwtService';

const CropsManagement: React.FC = () => {
  // const [crops, setCrops] = useState<Crop[]>([
  //   { id: 1, name: 'Lúa', area: 50, yield: 2000, plantingDate: '2024-04-10' },
  //   { id: 2, name: 'Ngô', area: 30, yield: 1500, plantingDate: '2024-05-15' },
  // ]);

  // const [show, setShow] = useState(false);
  // const [newCrop, setNewCrop] = useState<Crop>({
  //   id: 0,
  //   name: '',
  //   area: 0,
  //   yield: 0,
  //   plantingDate: '',
  // });

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const handleAddCrop = () => {
  //   setCrops([...crops, { ...newCrop, id: crops.length + 1 }]);
  //   handleClose();
  // };
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const userId : number= getIdUserByToken();
  useEffect(() => {
    getAllCrop(userId)
      .then((response) => {
        setCrops(response);
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
  const handleDeleteCrop = (cropId: number) => {
    deleteCrop(cropId)
      .then(() => {
        setCrops((prevItems) => prevItems.filter(item => item.cropId !== cropId)); // Cập nhật danh sách
        alert('Xóa thành công');
      })
      .catch((error) => {
        alert(`Lỗi khi xóa cây trồng: ${error.message}`);
      });
  };
  // const filteredEmployees = employees.filter(employee => {
  //   const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
  //   return (
  //     fullName.includes(searchTerm.toLowerCase()) ||
  //     employee.age.toString().includes(searchTerm)
  //   );
  // });
  return (
    <div className="container mt-5">
      <h1 className="text-center text-success">Quản lý cây trồng</h1>

      {/* <Button variant="success" onClick={handleShow} className="mb-3">
        Thêm cây trồng mới
      </Button> */}

      <Table striped bordered hover variant="light">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Tên cây trồng</th>
            <th>Diện tích (hecta)</th>
            <th>Năng suất (kg/hecta)</th>
            <th>Ngày gieo trồng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.cropId}>
              <td>{crop.cropId}</td>
              <td>{crop.cropName}</td>
              <td>{crop.acreage}</td>
              <td>{crop.productivity}</td>
              <td>{new Date(crop.plantingDay).toLocaleDateString()}</td>
              <td>
                <Button variant="danger" onClick={()=>handleDeleteCrop(crop.cropId)}>Xóa</Button>
                <Button variant="warning" className="ms-2">Sửa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal để thêm cây trồng mới */}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm cây trồng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCropName">
              <Form.Label>Tên cây trồng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên cây trồng"
                value={newCrop.name}
                onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formCropArea" className="mt-3">
              <Form.Label>Diện tích (hecta)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập diện tích"
                value={newCrop.area}
                onChange={(e) => setNewCrop({ ...newCrop, area: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formCropYield" className="mt-3">
              <Form.Label>Năng suất (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập năng suất"
                value={newCrop.yield}
                onChange={(e) => setNewCrop({ ...newCrop, yield: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formPlantingDate" className="mt-3">
              <Form.Label>Ngày gieo trồng</Form.Label>
              <Form.Control
                type="date"
                value={newCrop.plantingDate}
                onChange={(e) => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="success" onClick={handleAddCrop}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default CropsManagement;
