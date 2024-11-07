import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { getAllTransaction } from '../../api/TransactionApi';
import { getIdUserByToken } from '../../utils/JwtService';
import { TransactionModel } from '../../model/TransactionModel';

const FinancialManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const userId = getIdUserByToken();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container 
      fluid 
      className="p-4" 
      style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}
    >
      <Card className="shadow-lg p-4" style={{ borderRadius: '15px' }}>
        <h1 className="text-center text-primary mb-4" style={{ fontWeight: 'bold' }}>
          Quản lý tài chính
        </h1>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="filterMonth">
              <Form.Label style={{ fontWeight: 'bold', color: '#4B5563' }}>Chọn tháng</Form.Label>
              <Form.Control
                as="select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                style={{ backgroundColor: '#E5E7EB', borderColor: '#3B82F6', color: '#1F2937' }}
              >
                {Array.from({ length: 12 }, (_, month) => (
                  <option key={month} value={month}>{month + 1}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="filterYear">
              <Form.Label style={{ fontWeight: 'bold', color: '#4B5563' }}>Chọn năm</Form.Label>
              <Form.Control
                as="select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                style={{ backgroundColor: '#E5E7EB', borderColor: '#3B82F6', color: '#1F2937' }}
              >
                {[2020, 2021, 2022, 2023, 2024].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Table bordered hover responsive style={{ backgroundColor: '#FFFFFF' }}>
          <thead className="table-primary" style={{ color: '#111827', fontWeight: 'bold' }}>
            <tr className='text-center'>
              <th>Loại giao dịch</th>
              <th>Mô tả</th>
              <th>Số tiền</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.transactionId} className='text-center'>
                <td>{transaction.type}</td>
                <td>{transaction.description}</td>
                <td>{transaction.money.toLocaleString()} VND</td>
                <td>{new Date(transaction.date.toString()).toLocaleDateString()}</td>
                <td>
                  <Button variant="danger" style={{ borderRadius: '5px' }}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="mt-3">
          <h6 style={{ color: '#10B981', fontWeight: 'bold' }}>Tổng doanh thu: <span>{totalIncome.toLocaleString()} VND</span></h6>
          <h6 style={{ color: '#EF4444', fontWeight: 'bold' }}>Tổng chi phí: <span>{totalExpense.toLocaleString()} VND</span></h6>
          <h6 style={{ color: profit >= 0 ? '#10B981' : '#EF4444', fontWeight: 'bold' }}>Lợi nhuận: <span>{profit.toLocaleString()} VND</span></h6>
        </div>
      </Card>
    </Container>
  );
};

export default FinancialManagement;
