import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaPaw, FaSeedling, FaDollarSign } from 'react-icons/fa';
import AnimalModel from '../model/AnimalModel';
import CropModel from '../model/CropModel';
import { useDataContext } from '../utils/DataContext';
import { getIdUserByToken } from '../utils/JwtService';
import { getAllAnimal } from '../api/AnimalApi';
import { getAllCrop } from '../api/CropApi';



const Cards: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const userId = getIdUserByToken();
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
  const totalCrops = crops.reduce((sum, crop) => sum + crop.quantity, 0);

  // Giả sử số lượng vật nuôi là độ dài của mảng animals
  const totalAnimals = animals.reduce((sum, animal) => sum + animal.quantity, 0);

  return (
    <Row className="justify-content-center">
      <Col md={4}>
        <Card className="mb-4 text-center">
          <Card.Body>
            <Card.Title><FaPaw className="text-primary" /> Số lượng vật nuôi</Card.Title>
            <Card.Text className="display-4">{totalAnimals}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-4 text-center">
          <Card.Body>
            <Card.Title><FaSeedling className="text-success" /> Sản lượng cây trồng</Card.Title>
            <Card.Text className="display-4">{totalCrops} kg</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-4 text-center">
          <Card.Body>
            <Card.Title><FaDollarSign className="text-warning" /> Doanh thu gần đây</Card.Title>
            <Card.Text className="display-4">$15,000</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
