import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { SellData } from '../../model/SellData';

interface SellAnimalModalProps {
  show: boolean;
  handleClose: () => void;
  sellData: SellData;
  onSellDataChange: (field: keyof SellData, value: number) => void;
  handleSellAnimal: () => void;
}

const SellAnimalModal: React.FC<SellAnimalModalProps> = ({ show, handleClose, sellData, onSellDataChange, handleSellAnimal }) => {
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSellDataChange('quantity', parseInt(e.target.value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSellDataChange('sellPrice', parseFloat(e.target.value));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bán vật nuôi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuantity">
            <Form.Label>Số lượng bán</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={sellData.quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Giá bán</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={sellData.sellPrice}
              onChange={handlePriceChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSellAnimal}>
          Xác nhận bán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SellAnimalModal;
