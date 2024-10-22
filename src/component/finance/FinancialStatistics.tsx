import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

interface FinancialTransaction {
  id: number;
  type: 'Chi phí' | 'Doanh thu';
  description: string;
  amount: number;
  date: string;
}

const FinancialManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    { id: 1, type: 'Doanh thu', description: 'Bán nông sản', amount: 500000, date: '2024-10-01' },
    { id: 2, type: 'Chi phí', description: 'Mua phân bón', amount: 200000, date: '2024-10-05' },
  ]);

  const [show, setShow] = useState(false);
  const [newTransaction, setNewTransaction] = useState<FinancialTransaction>({
    id: 0,
    type: 'Doanh thu',
    description: '',
    amount: 0,
    date: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    handleClose();
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'Doanh thu')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'Chi phí')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const profit = totalIncome - totalExpense;

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Quản lý tài chính</h1>

      <Button variant="primary" onClick={handleShow} className="mb-3">
        Thêm giao dịch mới
      </Button>

      <Table striped bordered hover variant="light">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Loại giao dịch</th>
            <th>Mô tả</th>
            <th>Số tiền</th>
            <th>Ngày</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount.toLocaleString()} VND</td>
              <td>{transaction.date}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteTransaction(transaction.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-3">
        <h6>Tổng doanh thu: <span className="text-success">{totalIncome.toLocaleString()} VND</span></h6>
        <h6>Tổng chi phí: <span className="text-danger">{totalExpense.toLocaleString()} VND</span></h6>
        <h6>Lợi nhuận: <span className={profit >= 0 ? "text-success" : "text-danger"}>{profit.toLocaleString()} VND</span></h6>
      </div>

      {/* Modal để thêm giao dịch mới */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm giao dịch mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTransactionType">
              <Form.Label>Loại giao dịch</Form.Label>
              <Form.Control
                as="select"
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'Chi phí' | 'Doanh thu' })}
              >
                <option value="Doanh thu">Doanh thu</option>
                <option value="Chi phí">Chi phí</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTransactionDescription" className="mt-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTransactionAmount" className="mt-3">
              <Form.Label>Số tiền</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số tiền"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseInt(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="formTransactionDate" className="mt-3">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddTransaction}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FinancialManagement;
