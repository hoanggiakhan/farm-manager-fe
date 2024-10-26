import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useDataContext } from '../../utils/DataContext';
import { getIdUserByToken } from '../../utils/JwtService';
import { getAllCrop } from '../../api/CropApi';
import CropModel from '../../model/CropModel';

interface HarvestData {
  crop: string;
  quantity: number;
  date: string;
}

const Harvest: React.FC = () => {
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [crop, setCrop] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [harvestRecords, setHarvestRecords] = useState<HarvestData[]>([]);
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const userId = getIdUserByToken();
  useEffect(() => {
    if (userId) {
      fetchData(); // Fetch data when component mounts or userId changes
    }
  }, [userId]);
  useEffect(() => {
    // Fetch Data khi có cập nhật từ Context
    const fetchDataFromApi = async () => {
      const cropsData = await getAllCrop(userId);
      setCrops(cropsData);
    };
    fetchDataFromApi();
  }, [fetchData]); // Chạy lại khi fetchData thay đổi
  const handleAddHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: HarvestData = { crop, quantity, date };
    setHarvestRecords([...harvestRecords, newRecord]);
    setCrop('');
    setQuantity(0);
    setDate('');
  };
  // Lọc cây trồng có tuổi lớn hơn 3
  const filteredCrops = crops.filter((cropItem) => cropItem.age >= 3);
  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-success">Ghi nhận thu hoạch</h1>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-primary">Thêm sản lượng thu hoạch</Card.Title>
          <Form onSubmit={handleAddHarvest}>
            <Form.Group className="mb-3">
              <Form.Label>Cây trồng</Form.Label>
              <Form.Select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                required
              >
                <option value="">Chọn cây trồng</option>
                {filteredCrops.map((cropItem) => (
                  <option key={cropItem.cropId} value={cropItem.cropName}>
                    {cropItem.cropName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sản lượng (kg)</Form.Label>
              <Form.Control
                type="number"
                step="any" // Cho phép nhập số thập phân
                placeholder="Nhập sản lượng"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                required
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Ngày thu hoạch</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Ghi nhận thu hoạch
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="text-primary">Danh sách thu hoạch</Card.Title>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Cây trồng</th>
                <th>Sản lượng (kg)</th>
                <th>Ngày thu hoạch</th>
              </tr>
            </thead>
            <tbody>
              {harvestRecords.map((record, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }}>
                  <td>{record.crop}</td>
                  <td>{record.quantity}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Harvest;
