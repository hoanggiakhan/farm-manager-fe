import React, { useEffect, useState } from 'react';
import { Table, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import { deleteAnimal, getAllAnimal } from '../../api/AnimalApi';
import AnimalModel from '../../model/AnimalModel';
import { useDataContext } from '../../utils/DataContext';
import AnimalModal from './AnimalModal';
import { getIdUserByToken } from '../../utils/JwtService';

const AnimalManagement: React.FC = () => {
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const [show, setShow] = useState(false);
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = getIdUserByToken();
  useEffect(() => {
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
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // Hàm lọc động vật dựa trên từ khóa tìm kiếm
  const filteredAnimals = animals.filter(animal => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      animal.animalName.toLowerCase().includes(lowercasedSearchTerm) ||  // Tìm kiếm theo tên
      animal.age.toString().includes(lowercasedSearchTerm) ||          // Tìm kiếm theo tuổi
      (animal.status === 1 && 'Tốt'.toLowerCase().includes(lowercasedSearchTerm)) ||  // Tìm kiếm theo tình trạng sức khỏe
      (animal.status !== 1 && 'Khá'.toLowerCase().includes(lowercasedSearchTerm))    // Tìm kiếm theo tình trạng sức khỏe
    );
  });

  const handleDeleteAnimal = (animalId: number) => {
    if (!animalId) {
      alert('ID vật nuôi không hợp lệ.');
      return;
    }
    deleteAnimal(animalId)
      .then(() => {
        setAnimals((prevAnimals: AnimalModel[]) => 
          prevAnimals.filter((animal: AnimalModel) => animal.animalId !== animalId)
        );
        alert('Xóa vật nuôi thành công');
        fetchData();
      })
      .catch((error) => {
        alert(`Lỗi khi xóa vật nuôi: ${error.message}`);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success">Quản lý vật nuôi</h1>

      {/* Tìm kiếm/Lọc */}
      <div className="input-group mb-3">
      <InputGroup className="mb-3" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <InputGroup.Text>
          <i className="fas fa-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên, tuổi hoặc tình trạng sức khỏe"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      </div>
      <Table striped bordered hover variant="light">
        <thead className="table-success">
          <tr>
            <th>Tên vật nuôi</th>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Giá nhập</th>
            <th>Ngày mua</th>
            <th>Tuổi(năm)</th>
            <th>Tình trạng sức khỏe</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnimals.map(animal => (
            <tr key={animal.animalId}>
              <td>{animal.animalName}</td>
              <td>{animal.age>=1?'Trưởng thành':'Con non'}</td>
              <td>{animal.quantity}</td>
              <td>{animal.importPrice.toLocaleString()}</td>
              <td>{new Date(animal.buyDate.toString()).toLocaleDateString()}</td>
              <td>{animal.age}</td>
              <td>{animal.status===0?'Tốt':(animal.status===1?'Khá':'Trung bình')}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteAnimal(animal.animalId)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={handleShow}>
          Thêm vật nuôi mới
        </Button>
      {/* Modal để thêm vật nuôi mới */}
      <AnimalModal
        setShow={setShow}
        setAnimals={setAnimals}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
};

export default AnimalManagement;
