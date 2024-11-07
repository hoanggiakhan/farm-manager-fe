import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaPaw, FaSeedling, FaDollarSign } from 'react-icons/fa';
import AnimalModel from '../model/AnimalModel';
import CropModel from '../model/CropModel';
import { useDataContext } from '../utils/DataContext';
import { getIdUserByToken } from '../utils/JwtService';
import { getAllAnimal } from '../api/AnimalApi';
import { getAllCrop } from '../api/CropApi';
import { getAllHarvest } from '../api/HarvestApi';
import { HarvestModel } from '../model/HarvestModel';
import { TransactionModel } from '../model/TransactionModel';
import { getAllTransaction } from '../api/TransactionApi';



const Cards: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [harvests, setHarvests] = useState<HarvestModel[]>([]);
  const [transactions , setTransactions] = useState<TransactionModel[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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
    getAllHarvest(userId)
      .then((response) => {
        setHarvests(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId,fetchData]);

  useEffect(() => {
    getAllTransaction(userId)
      .then((response) => {
        setTransactions(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  const filterTransactionsByMonthAndYear = () => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date.toString());
      return (
        transactionDate.getMonth() === selectedMonth &&
        transactionDate.getFullYear() === selectedYear
      );
    });
  };

  const filteredTransactions = filterTransactionsByMonthAndYear();

  const totalIncome = filteredTransactions
    .filter(transaction => transaction.type === 'Doanh thu')
    .reduce((sum, transaction) => sum + transaction.money, 0);

  const totalExpense = filteredTransactions
    .filter(transaction => transaction.type === 'Chi phí')
    .reduce((sum, transaction) => sum + transaction.money, 0);
  const totalharvest = harvests.reduce((sum, harvest) => sum + harvest.quantity, 0);

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
            <Card.Text className="display-4">{totalharvest} kg</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-4 text-center">
          <Card.Body>
            <Card.Title><FaDollarSign className="text-warning" /> Doanh thu gần đây</Card.Title>
            <Card.Text className="display-4">{(totalIncome/25000).toLocaleString()} $</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
