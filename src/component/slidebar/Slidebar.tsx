import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faClipboard, faBoxes, faMapMarkedAlt, faSeedling, faQuestionCircle, faUsers, faBriefcase, faClock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import './Slidebar.css'; // Import file CSS
import { Link } from 'react-router-dom';
import { useDataContext } from '../../utils/DataContext';
import { getIdUserByToken } from '../../utils/JwtService';
import { getAllAnimal } from '../../api/AnimalApi';
import { getAllCrop } from '../../api/CropApi';
import AnimalModel from '../../model/AnimalModel';
import CropModel from '../../model/CropModel';

export const Sidebar: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const { fetchData } = useDataContext(); // Lấy hàm từ context
  const userId = getIdUserByToken();
  useEffect(() => {
    if (userId) {
      fetchData(); // Fetch data when component mounts or userId changes
    }
  }, [userId]);

  useEffect(() => {
    // Fetch Data khi có cập nhật từ Context
    const fetchDataFromApi = async () => {
      const animalsData = await getAllAnimal(userId);
      const cropsData = await getAllCrop(userId);
      setAnimals(animalsData);
      setCrops(cropsData);
    };
    fetchDataFromApi();
  }, [fetchData]); // Chạy lại khi fetchData thay đổi
  const totalAnimals = animals.reduce((sum, animal) => sum + animal.quantity, 0);

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="dashboard" className="nav-link farm-management">
            <i className="fas fa-seedling"></i> Farm Management
          </Link>
        </li>
        {/* <li>
          <Link to="position">
            <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Danh sách vị trí
          </Link>
        </li> */}
        <li>
          <Link to="tasklist">
            <FontAwesomeIcon icon={faList} className="me-2" /> Danh sách công việc
          </Link>
        </li>
        <li>
          <Link to="harvest">
            <FontAwesomeIcon icon={faClipboard} className="me-2" /> Quản lý thu hoạch
          </Link>
        </li>
        <li>
          <Link to="inventory">
            <FontAwesomeIcon icon={faBoxes} className="me-2" /> Quản lý kho
          </Link>
        </li>
        <li>
          <Link to="attendance">
            <FontAwesomeIcon icon={faUserCheck} className="me-2" />
            Quản lý công/ca
          </Link>
        </li>
        <li>
          <Link to="farmarea">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="me-2" /> Khu vực nông trại
          </Link>
        </li>
        <li>
          <Link to="careprocess">
            <FontAwesomeIcon icon={faSeedling} className="me-2" /> Quy trình chăm sóc
          </Link>
        </li>
        <li>
          <Link to="support">
            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" /> Hỗ trợ
          </Link>
        </li>
      </ul>
      <div className="statistics text-center">
        <hr className="divider" />
        <p className="stat-item"><strong>Số lượng vật nuôi:</strong> {totalAnimals}</p>
        <p className="stat-item"><strong>Số loại cây trồng:</strong> {crops.length}</p>
      </div>
    </div>
  );
};
