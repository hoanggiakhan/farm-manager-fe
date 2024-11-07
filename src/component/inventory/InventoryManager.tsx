import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import InventoryModel from '../../model/InventoryModel';
import { getIdUserByToken } from '../../utils/JwtService';
import { 
  getAllInventory, 
  getAllItemByInventory, 
  addItemToInventory, 
  deleteItemFromInventory, 
  addInventory, 
  deleteInventory 
} from '../../api/InventoryApi';
import ItemModel from '../../model/ItemModel';
import { InventoryModal } from './InventoryModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../utils/DataContext';

const InventoryManagement: React.FC = () => {
  const navigation = useNavigate();
  const [inventories, setInventories] = useState<InventoryModel[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorInventory, setErrorInventory] = useState<null | Error>(null);
  const [errorItems, setErrorItems] = useState<null | Error>(null);
  const [items, setItems] = useState<ItemModel[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const {fetchData} = useDataContext();
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

  const handleAddInventory = () => {
    addInventory(userId)
      .then(() => getAllInventory(userId))
      .then((updatedInventories) => {
        setInventories(updatedInventories);
        
        // Lấy inventoryId của kho mới nhất (giả định rằng kho mới nhất là kho có inventoryId lớn nhất)
        const latestInventoryId = updatedInventories[updatedInventories.length - 1]?.inventoryId;
        
        // Đặt kho mới thêm làm kho được chọn
        setSelectedWarehouse(latestInventoryId);
        fetchData();
        alert('Thêm kho thành công');
      })
      .catch((error) => {
        alert(`Lỗi khi thêm kho: ${error.message}`);
      });
  };


  const handleAddItem = () => {
    if (!selectedWarehouse) {
      alert('Nông trại chưa có kho, vui lòng thêm kho');
      return;
    }
    addItemToInventory(selectedWarehouse, newItem)
      .then(() => {
        setItems((prevItems) => [...prevItems, newItem]);
        setShowModal(false);
        setNewItem({
          itemId: 0,
          itemName: '',
          type: '',
          quantity: 0,
          unit: '',
          importPrice: 0,
        })
        alert('Thêm sản phẩm thành công');
        fetchData();
      })
      .catch((error) => {
       alert(`Lỗi khi thêm sản phẩm: ${error.message}`);
      });
  };

  const handleDeleteItem = (itemId: number) => {
    if (selectedWarehouse) {
      deleteItemFromInventory(itemId)
        .then(() => {
          setItems((prevItems) => prevItems.filter(item => item.itemId !== itemId));
          alert('Xóa sản phẩm thành công');
        })
        .catch((error) => {
          alert(`Lỗi khi xóa sản phẩm: ${error.message}`);
        });
    }
  };

  const handleDeleteInventory = () => {
    if(inventories.length===0){
      alert('Không còn kho nào');
    }
    if (selectedWarehouse) {
      deleteInventory(selectedWarehouse)
        .then(() => getAllInventory(userId))
        .then((updatedInventories) => {
          setInventories(updatedInventories);
  
          // Nếu vẫn còn kho, chọn kho đầu tiên trong danh sách mới
          if (updatedInventories.length > 0) {
            setSelectedWarehouse(updatedInventories[0].inventoryId);
            
            // Lấy các sản phẩm trong kho mới được chọn
            return getAllItemByInventory(updatedInventories[0].inventoryId);
          } else {
            // Nếu không còn kho nào, đặt selectedWarehouse là null và xóa danh sách items
            setSelectedWarehouse(null);
            setItems([]);
            return Promise.resolve([]); // Trả về danh sách trống
          }
        })
        .then((itemsInSelectedWarehouse) => {
          // Cập nhật danh sách sản phẩm với kho mới được chọn
          setItems(itemsInSelectedWarehouse);
          alert('Xóa kho thành công');
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
            <tr className='text-center'>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Số lượng</th>
              <th>Giá nhập</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.itemId} className='text-center'>
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
