import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { LocalDate } from "js-joda";
import { addAnimal, getAllAnimal } from "../../api/AnimalApi";
import { getIdUserByToken } from "../../utils/JwtService";
import { useDataContext } from "../../utils/DataContext";
import AnimalModel from "../../model/AnimalModel";

interface Crop {
    show: boolean,
    handleClose: () => void,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setAnimals: React.Dispatch<React.SetStateAction<AnimalModel[]>>
}

const AnimalModal: React.FC<Crop> = ({ show, handleClose, setAnimals, setShow }) => {
    const { fetchData } = useDataContext();
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
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let parsedValue: any;
    
        if (["quantity", "importPrice", "sellPrice", "age"].includes(name)) {
            parsedValue = value === "" ? "" : parseFloat(value);
        } else if (name === "status") {
            parsedValue = value === "" ? "" : parseInt(value, 10);
        } else if (name === "buyDate") {
            parsedValue = value === "" ? LocalDate.now().toString() : value;
        } else {
            parsedValue = value;
        }
    
        setNewAnimal({
            ...newAnimal,
            [name]: parsedValue,
        });
    };
    

    const handleAddAnimal = (event: React.FormEvent) => {
        event.preventDefault();
        const userId = getIdUserByToken();

        addAnimal(userId, newAnimal)
            .then(() => {
                alert('Thêm thành công');
                return getAllAnimal(userId);
            })
            .then((response) => {
                setAnimals(response);
                setShow(false);
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
                            name="animalName"
                            placeholder="Nhập tên vật nuôi"
                            value={newAnimal.animalName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formImportPrice" className="mt-3">
                        <Form.Label>Giá nhập</Form.Label>
                        <Form.Control
                            type="number"
                            name="importPrice"
                            placeholder="Nhập giá nhập"
                            value={newAnimal.importPrice}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAnimalQuantity" className="mt-3">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            placeholder="Nhập số lượng"
                            value={newAnimal.quantity}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAnimalStatus" className="mt-3">
                        <Form.Label>Tình trạng sức khỏe</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={newAnimal.status}
                            onChange={handleChange}
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
                            name="age"
                            step="any"
                            placeholder="Nhập tuổi"
                            value={newAnimal.age}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBuyDate" className="mt-3">
                        <Form.Label>Ngày mua</Form.Label>
                        <Form.Control
                            type="date"
                            name="buyDate"
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
