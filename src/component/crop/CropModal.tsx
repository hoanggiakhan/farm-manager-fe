import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CropModel from "../../model/CropModel";
import { LocalDate } from "js-joda";
import { addCrop, getAllCrop } from "../../api/CropApi";
import { getIdUserByToken } from "../../utils/JwtService";
import { getAllAnimal } from "../../api/AnimalApi";
import { useDataContext } from "../../utils/DataContext";
// import { LocalDate } from "js-joda"; // You may need a library to handle LocalDate if required.

interface Crop {
  show: any,
  handleClose: any,
  crops: CropModel[]
  setCrops: any,
  setShow: any
}

const CropModal: React.FC<Crop> = ({ show, handleClose, setCrops, setShow }) => {
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const [crop, setCrop] = useState<CropModel>({
    cropId: 0,
    cropName: '',
    sellPrice: 0,
    importPrice: 0,
    quantity: 0,
    status: 0,
    age: 0,
    plantingDay: LocalDate.now(),
    acreage: 0,
    productivity: 0,
    type : 0,
  });
  const userId = getIdUserByToken()
  const handleAddCrop = () => {
    addCrop(userId, crop)
      .then(() => {
        alert('Thêm thành công');
        // Gọi lại dữ liệu từ cơ sở dữ liệu
        return getAllCrop(userId);
      })
      .then((response) => {
        // Cập nhật state 'crops' với dữ liệu mới từ cơ sở dữ liệu
        fetchData();
        setCrops(response); // Sử dụng dữ liệu mới từ cơ sở dữ liệu
        setShow(false); // Ẩn modal sau khi thêm
        setCrop({
          cropId: 0,
          cropName: '',
          sellPrice: 0,
          importPrice: 0,
          quantity: 0,
          status: 0,
          age: 0,
          plantingDay: LocalDate.now(),
          acreage: 0,
          productivity: 0,
          type : 0,
        });
      })
      .catch((error) => {
        alert(`Lỗi khi thêm cây trồng: ${error.message}`);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCrop({
      ...crop,
      [name]: value,
    });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm cây trồng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCropName">
              <Form.Label>Tên cây trồng</Form.Label>
              <Form.Control
                type="text"
                name="cropName"
                value={crop.cropName}
                onChange={handleChange}
                placeholder="Nhập tên cây trồng"
              />
            </Form.Group>

            <Form.Group controlId="formSellPrice">
              <Form.Label>Giá bán</Form.Label>
              <Form.Control
                type="number"
                name="sellPrice"
                value={crop.sellPrice}
                onChange={handleChange}
                placeholder="Nhập giá bán"
              />
            </Form.Group>

            <Form.Group controlId="formImportPrice">
              <Form.Label>Giá nhập</Form.Label>
              <Form.Control
                type="number"
                name="importPrice"
                value={crop.importPrice}
                onChange={handleChange}
                placeholder="Nhập giá nhập"
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={crop.quantity}
                onChange={handleChange}
                placeholder="Nhập số lượng"
              />
            </Form.Group>

            <Form.Group controlId="formAnimalStatus" className="mt-3">
                        <Form.Label>Tình trạng</Form.Label>
                        <Form.Control
                            as="select"
                            value={crop.status}
                            onChange={(e) => setCrop({ ...crop, status: parseInt(e.target.value) })}
                        >
                            <option value="0">Khỏe</option>
                            <option value="1">Sâu bệnh</option>
                        </Form.Control>
                    </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Tuổi</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={crop.age}
                onChange={handleChange}
                placeholder="Nhập số ngày tuổi"
              />
            </Form.Group>

            <Form.Group controlId="formPlantingDay">
              <Form.Label>Ngày gieo trồng</Form.Label>
              <Form.Control
                type="date"
                name="plantingDay"
                value={crop.plantingDay.toString()}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAcreage">
              <Form.Label>Diện tích gieo trồng</Form.Label>
              <Form.Control
                type="number"
                name="acreage"
                value={crop.acreage}
                onChange={handleChange}
                placeholder="Nhập diện tích gieo trồng"
              />
            </Form.Group>

            <Form.Group controlId="formProductivity">
              <Form.Label>Năng suất</Form.Label>
              <Form.Control
                type="number"
                name="productivity"
                value={crop.productivity}
                onChange={handleChange}
                placeholder="Nhập năng suất"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCrop}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CropModal;
