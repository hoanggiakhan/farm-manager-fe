import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { deleteCrop, getAllCrop } from '../../api/CropApi';
import CropModal from './CropModal';
import { useDataContext } from '../../utils/DataContext';
import { getIdUserByToken } from '../../utils/JwtService';
import CropModel from '../../model/CropModel';

const CropsManagement: React.FC = () => {
  const { fetchData } = useDataContext();
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropModel | null>(null);
  const userId = getIdUserByToken();

  // Hàm đóng modal
  const handleClose = () => {
    setShow(false);
    setSelectedCrop(null); // Xóa chọn cây trồng sau khi đóng modal
  };

  // Hàm mở modal
  const handleShow = (crop?: CropModel) => {
    setSelectedCrop(crop || null);
    setShow(true);
  };

  // Tải dữ liệu cây trồng
  useEffect(() => {
    setLoading(true);
    getAllCrop(userId)
      .then((response) => {
        setCrops(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId, fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Xóa cây trồng
  const handleDeleteCrop = (cropId: number) => {
    deleteCrop(cropId)
      .then(() => {
        setCrops((prevItems) => prevItems.filter((item) => item.cropId !== cropId));
        alert('Xóa thành công');
        fetchData(); // Cập nhật lại dữ liệu sau khi xóa
      })
      .catch((error) => {
        alert(`Lỗi khi xóa cây trồng: ${error.message}`);
      });
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

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
          <h1 className="text-center text-success">Danh sách cây trồng</h1>
          <InputGroup className="mb-3" style={{ maxWidth: '450px', margin: '0 auto' }}>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm theo tên, tuổi hoặc tình trạng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>

          <Table striped bordered hover responsive variant="light">
            <thead className="table-success">
              <tr className='text-center'>
                <th>Tên cây trồng</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th>Tuổi (năm)</th>
                <th>Số lượng cây</th>
                <th>Ngày gieo trồng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop) => (
                <tr key={crop.cropId} className='text-center'>
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
                  <td>{crop.quantity}</td>
                  <td>{new Date(crop.plantingDay.toString()).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteCrop(crop.cropId)}>
                      Xóa
                    </Button>
                    <Button variant="warning" className="ms-2" onClick={() => handleShow(crop)}>
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="success" onClick={() => handleShow()} className="mb-3">
            Thêm cây trồng mới
          </Button>

          <CropModal
            handleClose={handleClose}
            show={show}
            crops={crops}
            setCrops={setCrops}
            setShow={setShow}
            selectedCrop={selectedCrop} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CropsManagement;
