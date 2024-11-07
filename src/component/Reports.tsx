import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Document, Packer, Paragraph} from "docx";
import { saveAs } from "file-saver";
import CropModel from "../model/CropModel";
import AnimalModel from "../model/AnimalModel";
import { TransactionModel } from "../model/TransactionModel";
import { getAllCrop } from "../api/CropApi";
import { getIdUserByToken } from "../utils/JwtService";
import { useDataContext } from "../utils/DataContext";
import { getAllAnimal } from "../api/AnimalApi";
import { getAllTransaction } from "../api/TransactionApi";

const ReportPage: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [crops , setCrops] = useState<CropModel[]>([])
  const [transactions , setTransactions] = useState<TransactionModel[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const userId = getIdUserByToken();
  const {fetchData} = useDataContext();
  // Giả định dữ liệu (thay thế bằng dữ liệu thực tế)
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


  useEffect(() => {
    getAllAnimal(userId)
      .then((response) => {
        setAnimals(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);
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

  const profit = totalIncome - totalExpense;

  const totalAnimalBought = animals.reduce((sum, animal) => sum + animal.quantity, 0);
  const totalCropBought = crops.reduce((sum, crop) => sum + crop.quantity, 0);
  const data = {
    crops: {
      bought: 100,
      sold: 80,
    },
    animals: {
      bought: 50,
      sold: 30,
    },
    financial: {
      income: 20000,
      expenses: 15000,
      profit: 5000,
    },
  };

  const exportToWord = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Báo cáo tháng",
              heading: "Heading1",
            }),
            new Paragraph("Cây trồng:"),
            new Paragraph(`- Đã mua: ${data.crops.bought}`),
            new Paragraph(`- Đã bán: ${data.crops.sold}`),
            new Paragraph("Vật nuôi:"),
            new Paragraph(`- Đã mua: ${data.animals.bought}`),
            new Paragraph(`- Đã bán: ${data.animals.sold}`),
            new Paragraph("Báo cáo tài chính:"),
            new Paragraph(`- Doanh thu: ${data.financial.income.toLocaleString()}`),
            new Paragraph(`- Chi phí: ${data.financial.expenses.toLocaleString()}`),
            new Paragraph(`- Lợi nhuận: ${data.financial.profit.toLocaleString()}`),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "bao_cao_thang.docx");
    });
  };
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' }); // Tên tháng
  const year = currentDate.getFullYear(); // Năm
  return (
    <Container fluid className="mt-4">
      <h2 className="text-center">Báo Cáo {month}/{year}</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Cây trồng</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Loại</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Đã thu hoạch</td>
                    <td>{data.crops.bought}</td>
                  </tr>
                  <tr>
                    <td>Đã bán</td>
                    <td>{data.crops.sold}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header as="h5">Vật nuôi</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Loại</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Đã mua</td>
                    <td>{totalAnimalBought}</td>
                  </tr>
                  <tr>
                    <td>Đã bán</td>
                    <td>{data.animals.sold}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header as="h5">Báo cáo tài chính</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Loại</th>
                    <th>Số tiền (VNĐ)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Doanh thu</td>
                    <td>{totalIncome.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Chi phí</td>
                    <td>{totalExpense.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Lợi nhuận</td>
                    <td>{profit.toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12} className="text-center">
          <Button variant="success" onClick={exportToWord}>
            Xuất báo cáo ra Word
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportPage;
