import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import InventoryModel from '../../model/InventoryModel';
import { getIdUserByToken } from '../../utils/JwtService';
import { getAllInventory, getAllItemByInventory, addItemToInventory, deleteItemFromInventory, addInventory, deleteInventory } from '../../api/InventoryApi'; // API add item
import ItemModel from '../../model/ItemModel';
import { InventoryModal } from './InventoryModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InventoryManagement: React.FC = () => {
  const navigation = useNavigate();
  const [inventories, setInventories] = useState<InventoryModel[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorInventory, setErrorInventory] = useState<null | Error>(null);
  const [errorItems, setErrorItems] = useState<null | Error>(null);
  const [items, setItems] = useState<ItemModel[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [newItem, setNewItem] = useState<ItemModel>({
    itemId: 0,
    itemName: '',
    type: '',
    quantity: 0,
    unit: '',
    importPrice: 0,
  });

  const userId: number = getIdUserByToken();

  // Lấy danh sách kho
  useEffect(() => {
    getAllInventory(userId)
      .then((response) => {
        setInventories(response);
        if (response.length > 0) {
          setSelectedWarehouse(response[0].inventoryId); // Chọn kho đầu tiên làm mặc định
        }
        setLoadingInventory(false);
      })
      .catch((error) => {
        setLoadingInventory(false);
        setErrorInventory(error);
      });
  }, [userId]);

  const handleAddInventory = () => {
    addInventory(userId)
      .then(() => {
        // Gọi lại API để lấy danh sách kho sau khi thêm
        getAllInventory(userId)
          .then((updatedInventories) => {
            setInventories(updatedInventories); // Cập nhật lại danh sách kho mới
            alert('Thêm kho thành công');
          })
          .catch((error) => {
            alert(`Lỗi khi tải danh sách kho: ${error.message}`);
          });
      })
      .catch((error) => {
        alert(`Lỗi khi thêm kho: ${error.message}`);
      });
  };


  // Lấy danh sách sản phẩm khi mã kho được chọn
  useEffect(() => {
    if (selectedWarehouse) {
      setLoadingItems(true);
       getAllItemByInventory(selectedWarehouse)
        .then((response) => {
          setItems(response);
          setLoadingItems(false);
        })
        .catch((error) => {
          setLoadingItems(false);
          setErrorItems(error);
        });
    }
  }, [selectedWarehouse]);

  const handleAddItem = () => {
    if (!selectedWarehouse) {
      alert('Nông trại chưa có kho, vui lòng thêm kho');
      setShowModal(false);
      return;
    }
    addItemToInventory(selectedWarehouse, newItem)
      .then(() => {
        getAllItemByInventory(userId)
            .then((updatedItems) => {
              setItems(updatedItems); 
            })
            .catch((error) => {
              alert(`Lỗi khi tải danh sách kho: ${error.message}`);
            });
        alert('Thêm thành công');
        setItems((prevItems) => [...prevItems, newItem]); // Cập nhật danh sách sản phẩm
        setShowModal(false); // Ẩn modal sau khi thêm
      })
      .catch((error) => {
        alert(`Lỗi khi thêm sản phẩm: ${error.message}`);
      });
  };

  const handleDeleteItem = (itemId: number) => {
    if (selectedWarehouse) {
      deleteItemFromInventory(itemId)
        .then(() => {
          setItems((prevItems) => prevItems.filter(item => item.itemId !== itemId)); // Cập nhật danh sách sản phẩm
          toast.success('Xóa thành công');
        })
        .catch((error) => {
          toast.error(`Lỗi khi xóa sản phẩm: ${error.message}`);
        });
    }
  };

  const handleDeleteInventory = () => {
    if (selectedWarehouse) {
      deleteInventory(selectedWarehouse)
        .then(() => {
          // Gọi lại API để lấy danh sách kho sau khi xóa
          getAllInventory(userId)
            .then((updatedInventories) => {
              setInventories(updatedInventories); // Cập nhật lại danh sách kho mới
              alert('Xóa kho thành công');
            })
            .catch((error) => {
              alert(`Lỗi khi tải danh sách kho: ${error.message}`);
            });
        })
        .catch((error) => {
          alert(`Lỗi khi xóa kho: ${error.message}`);
        });
    }
  };


  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  if (loadingInventory) {
    return <div>Đang tải danh sách kho...</div>;
  }

  if (errorInventory) {
    return <div>Lỗi khi tải danh sách kho: {errorInventory.message}</div>;
  }

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Quản lý kho</h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="selectWarehouse">
            <Form.Label>Chọn mã kho</Form.Label>
            <Form.Select
              value={selectedWarehouse || ''}
              onChange={(e) => setSelectedWarehouse(parseInt(e.target.value))}
            >
              {inventories.map((inventory) => (
                <option key={inventory.inventoryId} value={inventory.inventoryId}>
                  {inventory.inventoryId}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} className="text-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      {loadingItems ? (
        <div>Đang tải danh sách sản phẩm...</div>
      ) : errorItems ? (
        <div>Lỗi khi tải danh sách sản phẩm: {errorItems.message}</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Số lượng</th>
              <th>Giá nhập</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.itemId}>
                <td>{item.itemName}</td>
                <td>{item.type}</td>
                <td>{item.quantity} ({item.unit})</td>
                <td>{item.importPrice.toLocaleString()}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteItem(item.itemId)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal thêm sản phẩm */}
      <InventoryModal
        handleAddItem={handleAddItem}
        showModal={showModal}
        newItem={newItem}
        handleModalChange={handleModalChange}
        setShowModal={setShowModal}
      />

      <Button variant="success" onClick={handleAddInventory}>
        Thêm kho
      </Button>
      <Button variant="danger" onClick={handleDeleteInventory} style={{ marginLeft: '4px' }}>
        Xóa kho
      </Button>
    </Container>
  );
};

export default InventoryManagement;
