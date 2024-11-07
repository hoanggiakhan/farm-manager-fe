import React, { useEffect, useState, useCallback } from 'react';
import { Card, Form, Button, Table, Container, Row, Col, Modal } from 'react-bootstrap';
import { useDataContext } from '../../utils/DataContext';
import { getIdUserByToken } from '../../utils/JwtService';
import { getAllCrop } from '../../api/CropApi';
import CropModel from '../../model/CropModel';
import { addHarvest, getAllHarvest, sellHarvest } from '../../api/HarvestApi';
import { HarvestModel } from '../../model/HarvestModel';
import { LocalDate } from 'js-joda';
import { SellData } from '../../model/SellData';

const Harvest: React.FC = () => {
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [harvests, setHarvests] = useState<HarvestModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const { fetchData } = useDataContext();
  const userId = getIdUserByToken();
  const [newHarvest, setNewHarvest] = useState<HarvestModel>({
    harvestId: 0,
    harvestDate: LocalDate.now(),
    quantity: 0,
    sellPrice: 0,
    cropName: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [currentHarvest, setCurrentHarvest] = useState<HarvestModel | null>(null);
  const [sellData, setSellData] = useState<SellData>({
    quantity: 0,
    sellPrice: 0
  });
  const fetchDataFromApi = useCallback(async () => {
    setLoading(true);
    try {
      if (!userId) return;
      const cropsData = await getAllCrop(userId);
      const filteredCrops = cropsData.filter((crop) => crop.age >= 3 || crop.age===0);
      setCrops(filteredCrops);

      const harvestData = await getAllHarvest(userId);
      setHarvests(harvestData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  const handleAddHarvest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) return;
      await addHarvest(userId, newHarvest);
      alert('Thêm thành công');

      const updatedHarvests = await getAllHarvest(userId);
      setHarvests(updatedHarvests);

      setNewHarvest({
        harvestId: 0,
        harvestDate: LocalDate.now(),
        quantity: 0,
        sellPrice: 0,
        cropName: ''
      });
      fetchData();
    } catch (error) {
      alert(`Lỗi khi thêm phiếu thu hoạch: ${(error as Error).message}`);
    }
  };

  const handleSell = (harvest: HarvestModel) => {
    setCurrentHarvest(harvest);
    setSellData({
      quantity: harvest.quantity,
      sellPrice: harvest.sellPrice
    });
    setShowModal(true);
  };

  const handleConfirmSell = async () => {
    if (!currentHarvest || !userId) return;

    try {
      await sellHarvest(currentHarvest.harvestId, {
        quantity: sellData.quantity,
        sellPrice: sellData.sellPrice
      });
      alert('Đã bán thành công');

      const updatedHarvests = await getAllHarvest(userId);
      setHarvests(updatedHarvests);
      setShowModal(false);
      fetchData();

    } catch (error) {
      alert(`Lỗi khi bán: ${(error as Error).message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                value={newHarvest.cropName}
                onChange={(e) => setNewHarvest({ ...newHarvest, cropName: e.target.value })}
                required
              >
                <option value="">Chọn cây trồng</option>
                {crops.map((cropItem) => (
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
                step="any"
                placeholder="Nhập sản lượng"
                value={newHarvest.quantity}
                onChange={(e) => setNewHarvest({ ...newHarvest, quantity: parseFloat(e.target.value) })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày thu hoạch</Form.Label>
              <Form.Control
                type="date"
                value={newHarvest.harvestDate.toString()}
                onChange={(e) => setNewHarvest({ ...newHarvest, harvestDate: LocalDate.parse(e.target.value) })}
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
              <tr className='text-center'>
                <th>Mã phiếu</th>
                <th>Cây trồng</th>
                <th>Sản lượng (kg)</th>
                <th>Ngày thu hoạch</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {harvests.map((harvest, index) => (
                <tr key={harvest.harvestId} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef' }} className='text-center'>
                  <td>{harvest.harvestId}</td>
                  <td>{harvest.cropName}</td>
                  <td>{harvest.quantity}</td>
                  <td>{new Date(harvest.harvestDate.toString()).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleSell(harvest)}>Bán</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Bán thu hoạch</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Số lượng</Form.Label>
        <Form.Control
          type="number"
          value={isNaN(sellData.quantity) ? "" : sellData.quantity}
          onChange={(e) =>
            setSellData({ ...sellData, quantity: parseFloat(e.target.value) || 0 })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Giá bán</Form.Label>
        <Form.Control
          type="number"
          value={isNaN(sellData.sellPrice) ? "" : sellData.sellPrice}
          onChange={(e) =>
            setSellData({ ...sellData, sellPrice: parseFloat(e.target.value) || 0 })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Hủy
    </Button>
    <Button variant="primary" onClick={handleConfirmSell}>
      Xác nhận bán
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default Harvest;
