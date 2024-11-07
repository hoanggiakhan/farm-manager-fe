import React, { useEffect, useState } from 'react';
import { Table, Button, FormControl, InputGroup } from 'react-bootstrap';
import { deleteAnimal, getAllAnimal, sellAnimal } from '../../api/AnimalApi';
import AnimalModel from '../../model/AnimalModel';
import { useDataContext } from '../../utils/DataContext';
import AnimalModal from './AnimalModal';
import SellAnimalModal from './SellAnimalModal';
import { getIdUserByToken } from '../../utils/JwtService';
import { SellData } from '../../model/SellData';

const AnimalManagement: React.FC = () => {
  const { fetchData } = useDataContext();
  const [show, setShow] = useState(false);
  const [sellModalShow, setSellModalShow] = useState(false);
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = getIdUserByToken();
  const [currentAnimal, setCurrentAnimal] = useState<AnimalModel | null>(null);
  const [sellData, setSellData] = useState<SellData>({ quantity: 0, sellPrice: 0 });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSellClose = () => setSellModalShow(false);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredAnimals = animals.filter(animal => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      animal.animalName.toLowerCase().includes(lowercasedSearchTerm) ||
      animal.age.toString().includes(lowercasedSearchTerm) ||
      (animal.status === 1 && 'Tốt'.toLowerCase().includes(lowercasedSearchTerm)) ||
      (animal.status !== 1 && 'Khá'.toLowerCase().includes(lowercasedSearchTerm))
    );
  });

  const handleDeleteAnimal = (animalId: number) => {
    if (!animalId) {
      alert('ID vật nuôi không hợp lệ.');
      return;
    }
    deleteAnimal(animalId)
      .then(() => {
        setAnimals(prevAnimals => prevAnimals.filter(animal => animal.animalId !== animalId));
        alert('Xóa vật nuôi thành công');
        fetchData();
      })
      .catch((error) => {
        alert(`Lỗi khi xóa vật nuôi: ${error.message}`);
      });
  };

  const handleSellShow = (animal: AnimalModel) => {
    setCurrentAnimal(animal);
    setSellData({ quantity: 0, sellPrice: 0 });
    setSellModalShow(true);
  };

  const handleConfirmSell = async () => {
    if (!currentAnimal || !userId) return;

    try {
      await sellAnimal(currentAnimal.animalId, {
        quantity: sellData.quantity,
        sellPrice: sellData.sellPrice
      }, userId);
      alert('Đã bán thành công');
      
      const updatedAnimals = await getAllAnimal(userId);
      setAnimals(updatedAnimals);
      setSellModalShow(false);
      fetchData();

    } catch (error) {
      alert(`Lỗi khi bán: ${(error as Error).message}`);
    }
  };

  const handleSellDataChange = (field: keyof SellData, value: number) => {
    setSellData(prevData => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <h1 className="text-center text-primary mb-4">Danh sách vật nuôi</h1>

      <div className="d-flex justify-content-center mb-3">
        <InputGroup style={{ maxWidth: '450px' }}>
          <InputGroup.Text>
            <i className="fas fa-search"></i>
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Tìm kiếm theo tên, tuổi hoặc tình trạng sức khỏe"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive style={{ backgroundColor: '#fff' }}>
        <thead className="table-primary text-dark">
          <tr className='text-center'>
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
          {filteredAnimals.map((animal) => (
            <tr key={animal.animalId} className='text-center'>
              <td>{animal.animalName}</td>
              <td>{animal.age >= 1 ? 'Trưởng thành' : 'Con non'}</td>
              <td>{animal.quantity}</td>
              <td>{animal.importPrice.toLocaleString()} VND</td>
              <td>{new Date(animal.buyDate.toString()).toLocaleDateString()}</td>
              <td>{animal.age}</td>
              <td>{animal.status === 0 ? 'Tốt' : (animal.status === 1 ? 'Khá' : 'Trung bình')}</td>
              <td className="d-flex gap-2">
                <Button variant="danger" onClick={() => handleDeleteAnimal(animal.animalId)} style={{ padding: '5px 10px' }}>
                  Xóa
                </Button>
                <Button variant="warning" onClick={() => handleSellShow(animal)} style={{ padding: '5px 10px' }}>
                  Bán
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-3">
        <Button variant="success" onClick={handleShow}>
          Thêm vật nuôi mới
        </Button>
      </div>

      <AnimalModal
        setShow={setShow}
        setAnimals={setAnimals}
        handleClose={handleClose}
        show={show}
      />

      <SellAnimalModal
        show={sellModalShow}
        handleClose={handleSellClose}
        sellData={sellData}
        onSellDataChange={handleSellDataChange}
        handleSellAnimal={handleConfirmSell}
      />
    </div>
  );
};

export default AnimalManagement;
