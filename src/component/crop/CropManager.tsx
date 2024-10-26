import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { deleteCrop, getAllCrop } from '../../api/CropApi';
import CropModal from './CropModal';
import { useDataContext } from '../../utils/DataContext';
import { getIdUserByToken } from '../../utils/JwtService';
import CropModel from '../../model/CropModel';

const CropsManagement: React.FC = () => {
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state cho tìm kiếm
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const userId = getIdUserByToken();
  useEffect(() => {
    // Fetch Crop Data
    getAllCrop(userId)
      .then((response) => {
        setCrops(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteCrop = (cropId: number) => {
    deleteCrop(cropId)
      .then(() => {
        setCrops((prevItems: any) => prevItems.filter((item: any) => item.cropId !== cropId));
        alert('Xóa thành công');
        fetchData();
      })
      .catch((error) => {
        alert(`Lỗi khi xóa cây trồng: ${error.message}`);
      });

  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách cây trồng dựa trên tìm kiếm
  const filteredCrops = crops.filter(
    (crop) =>
      crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.age.toString().includes(searchTerm) ||
      (crop.status === 0 ? 'Khỏe' : 'Sâu bệnh').includes(searchTerm)
  );

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center text-success">Quản lý cây trồng</h1>

          {/* Form tìm kiếm */}
          <InputGroup className="mb-3" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên, tuổi hoặc tình trạng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

          <Table striped bordered hover responsive variant="light">
            <thead className="table-success">
              <tr>
                <th>Tên cây trồng</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th>Tuổi (năm)</th>
                <th>Năng suất (kg/hecta)</th>
                <th>Ngày gieo trồng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop) => (
                <tr key={crop.cropId}>
                  <td>{crop.cropName}</td>
                  <td>
                    {crop.age <= 1 && crop.age > 0
                      ? 'Cây non'
                      : crop.age > 1
                      ? 'Cây trưởng thành'
                      : 'Cây thu hoạch sớm'}
                  </td>
                  <td>{crop.status === 0 ? 'Khỏe' : 'Sâu bệnh'}</td>
                  <td>{crop.age === 0 ? '' : crop.age}</td>
                  <td>{crop.productivity}</td>
                  <td>{new Date(crop.plantingDay.toString()).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteCrop(crop.cropId)}>Xóa</Button>
                    <Button variant="warning" className="ms-2">Sửa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="success" onClick={handleShow} className="mb-3">
            Thêm cây trồng mới
          </Button>

          {/* Modal để thêm cây trồng mới */}
          <CropModal
            handleClose={handleClose}
            show={show}
            crops={crops}
            setCrops={setCrops}
            setShow={setShow}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CropsManagement;
