import React from 'react';
import { Card, Button, Table, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { utils, writeFile } from 'xlsx';

const Reports: React.FC = () => {
  const cropData = [
    { name: 'Lúa', quantity: 100, area: '10ha' },
    { name: 'Ngô', quantity: 200, area: '20ha' },
  ];

  const animalData = [
    { name: 'Bò', quantity: 50 },
    { name: 'Gà', quantity: 200 },
  ];

  const financialData = [
    { category: 'Doanh thu', amount: 500000 },
    { category: 'Chi phí', amount: 200000 },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Báo cáo cây trồng
    doc.text("Báo cáo cây trồng", 10, 10);
    cropData.forEach((crop, index) => {
      doc.text(`${crop.name} - ${crop.quantity} - ${crop.area}`, 10, 20 + index * 10);
    });

    // Chuyển trang cho báo cáo động vật
    doc.addPage();
    doc.text("Báo cáo vật nuôi", 10, 10);
    animalData.forEach((animal, index) => {
      doc.text(`${animal.name} - ${animal.quantity}`, 10, 20 + index * 10);
    });

    // Chuyển trang cho báo cáo tài chính
    doc.addPage();
    doc.text("Báo cáo tài chính", 10, 10);
    financialData.forEach((finance, index) => {
      doc.text(`${finance.category} - ${finance.amount}`, 10, 20 + index * 10);
    });

    doc.save("report_complete.pdf");
  };

  const handleExportExcel = () => {
    // Cây trồng
    const cropWs = utils.json_to_sheet(cropData);
    const animalWs = utils.json_to_sheet(animalData);
    const financeWs = utils.json_to_sheet(financialData);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, cropWs, "Cây trồng");
    utils.book_append_sheet(wb, animalWs, "Vật nuôi");
    utils.book_append_sheet(wb, financeWs, "Tài chính");

    writeFile(wb, "report_complete.xlsx");
  };

  return (
    <Container>
      <h1 className="text-center my-4">Báo cáo</h1>

      {/* Báo cáo cây trồng */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary">Tổng hợp báo cáo về cây trồng</Card.Title>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Tên cây trồng</th>
                <th>Số lượng</th>
                <th>Diện tích</th>
              </tr>
            </thead>
            <tbody>
              {cropData.map((crop, index) => (
                <tr key={index}>
                  <td>{crop.name}</td>
                  <td>{crop.quantity}</td>
                  <td>{crop.area}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Báo cáo vật nuôi */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary">Tổng hợp báo cáo về vật nuôi</Card.Title>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Tên vật nuôi</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {animalData.map((animal, index) => (
                <tr key={index}>
                  <td>{animal.name}</td>
                  <td>{animal.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Báo cáo tài chính */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary">Tổng hợp báo cáo về tài chính</Card.Title>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Chuyên mục</th>
                <th>Số tiền</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((finance, index) => (
                <tr key={index}>
                  <td>{finance.category}</td>
                  <td>{finance.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Nút xuất */}
      <div className="text-center mb-4">
        <Button variant="primary" className="me-2" onClick={handleExportPDF}>
          Xuất PDF
        </Button>
        <Button variant="success" onClick={handleExportExcel}>
          Xuất Excel
        </Button>
      </div>
    </Container>
  );
};

export default Reports;
