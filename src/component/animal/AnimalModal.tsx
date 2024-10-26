import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CropModel from "../../model/CropModel";
import { LocalDate } from "js-joda";
import { addCrop } from "../../api/CropApi";
import { getIdUserByToken } from "../../utils/JwtService";
import AnimalModel from "../../model/AnimalModel";
import { addAnimal, getAllAnimal } from "../../api/AnimalApi";
import { useDataContext } from "../../utils/DataContext";
// import { LocalDate } from "js-joda"; // You may need a library to handle LocalDate if required.

interface Crop {
    show: any,
    handleClose: any,
    setShow: any,
    setAnimals: any
}

const AnimalModal: React.FC<Crop> = ({ show, handleClose, setAnimals, setShow }) => {
    const { fetchData } = useDataContext(); // Lấy hàm từ context
    const [newAnimal, setNewAnimal] = useState<AnimalModel>({
        animalId: 0,
        animalName: '',
        importPrice: 0,
        sellPrice: 0,
        quantity: 0,
        status: 0,
        age: 0,
        buyDate: LocalDate.now(),
        type: 0,
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAnimal({
            ...newAnimal,
            [name]: value,
        });
    };
    const userId = getIdUserByToken()
    const handleAddAnimal = (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn chặn reload trang
        const userId = getIdUserByToken();
        
        addAnimal(userId, newAnimal)
            .then(() => {
                alert('Thêm thành công');
                return getAllAnimal(userId); // Gọi lại dữ liệu từ cơ sở dữ liệu
            })
            .then((response) => {
                setAnimals(response); // Cập nhật với danh sách động vật mới
                setShow(false); // Ẩn modal sau khi thêm
                setNewAnimal({
                    animalId: 0,
                    animalName: '',
                    importPrice: 0,
                    sellPrice: 0,
                    quantity: 0,
                    status: 0,
                    age: 0,
                    buyDate: LocalDate.now(),
                    type: 0,
                });
                fetchData();
            })
            .catch((error) => {
                alert(`Lỗi khi thêm động vật: ${error.message}`);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Thêm vật nuôi mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleAddAnimal}>
                <Form.Group controlId="formAnimalName">
                    <Form.Label>Tên vật nuôi</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên vật nuôi"
                        value={newAnimal.animalName}
                        onChange={(e) => setNewAnimal({ ...newAnimal, animalName: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formSellPrice" className="mt-3">
                    <Form.Label>Giá bán</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Nhập giá bán"
                        value={newAnimal.sellPrice}
                        onChange={(e) => setNewAnimal({ ...newAnimal, sellPrice: parseFloat(e.target.value) })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImportPrice" className="mt-3">
                    <Form.Label>Giá nhập</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Nhập giá nhập"
                        value={newAnimal.importPrice}
                        onChange={(e) => setNewAnimal({ ...newAnimal, importPrice: parseFloat(e.target.value) })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAnimalQuantity" className="mt-3">
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Nhập số lượng"
                        value={newAnimal.quantity}
                        onChange={(e) => setNewAnimal({ ...newAnimal, quantity: parseFloat(e.target.value) })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAnimalStatus" className="mt-3">
                    <Form.Label>Tình trạng sức khỏe</Form.Label>
                    <Form.Control
                        as="select"
                        value={newAnimal.status}
                        onChange={(e) => setNewAnimal({ ...newAnimal, status: parseInt(e.target.value) })}
                        required
                    >
                        <option value="0">Tốt</option>
                        <option value="1">Khá</option>
                        <option value="2">Trung bình</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formAnimalAge" className="mt-3">
                    <Form.Label>Tuổi</Form.Label>
                    <Form.Control
                        type="number"
                        step="any"
                        placeholder="Nhập tuổi"
                        value={newAnimal.age}
                        onChange={(e) => setNewAnimal({ ...newAnimal, age: parseFloat(e.target.value) })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBuyDate" className="mt-3">
                    <Form.Label>Ngày mua</Form.Label>
                    <Form.Control
                        type="date"
                        value={newAnimal.buyDate.toString()}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="secondary" onClick={handleClose} className="mt-3">
                    Đóng
                </Button>
                <Button variant="success" type="submit" className="mt-3 ms-2">
                    Thêm
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    );
};

export default AnimalModal;
