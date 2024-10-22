import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ItemModel from "../../model/ItemModel";
interface InventoryProps{
    showModal : any;
    setShowModal : any;
    newItem : ItemModel;
    handleModalChange : any;
    handleAddItem : any;
}
export const InventoryModal : React.FC<InventoryProps> = ({handleAddItem,showModal,setShowModal,newItem,handleModalChange})=>{
    return(
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={newItem.itemName}
                onChange={handleModalChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={newItem.type}
                onChange={handleModalChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleModalChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="unit">
              <Form.Label>Đơn vị</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={newItem.unit}
                onChange={handleModalChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="importPrice">
              <Form.Label>Giá nhập</Form.Label>
              <Form.Control
                type="number"
                name="importPrice"
                value={newItem.importPrice}
                onChange={handleModalChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Thêm sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    );
}