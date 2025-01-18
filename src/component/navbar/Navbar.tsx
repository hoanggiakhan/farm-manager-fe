import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getIdUserByToken, getRoleByToken, logout } from '../../utils/JwtService'; // Giả sử getUserRole là hàm lấy vai trò
import { useAuth } from '../../utils/AuthContext';
import './Navbar.css';
import { useDataContext } from '../../utils/DataContext';
import { NotificationModel } from '../../model/NotifiationModel';
import { getAllNotification } from '../../api/EmployeeApi';

interface NavbarProps {
  className?: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({ className }) => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { fetchData } = useDataContext();
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const userId = getIdUserByToken();
  const userRole = getRoleByToken(); // Lấy vai trò người dùng từ hàm

  const handleLogout = () => {
    logout(navigate);
    setLoggedIn(false);
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const notificationData = await getAllNotification(userId);
      setNotifications(notificationData);
    };
    fetchDataFromApi();
  }, [fetchData]);
  return (
    <Navbar bg="success" variant="dark" expand="lg" fixed="top" className={`custom-navbar ${className || ''}`}>
      <Container fluid>
      <Navbar.Brand className="fw-bold d-flex align-items-center">
  <i className="fas fa-tractor me-2"></i>
  {userRole !== 'ADMIN' && <h5 className="mb-0">FARM MANAGER</h5>}
</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            {userRole === 'ADMIN' ? (
              <>
                <Link to="dashboard" className="nav-link">Dashboard</Link>
                <Link to="livestock" className="nav-link">Quản lý vật nuôi</Link>
                <Link to="crops" className="nav-link">Quản lý cây trồng</Link>
                <Link to="employees" className="nav-link">Quản lý nhân sự</Link>
                <Link to="finance" className="nav-link">Thống kê tài chính</Link>
                {/* <Link to="reports" className="nav-link">Báo cáo</Link> */}
              </>
            ) : (
              <>
                <Link to="tasks" className="nav-link">Danh sách công việc</Link>
                <Link to="attendance" className="nav-link">Chấm công</Link>
                <Link to="support" className="nav-link">Hỗ trợ</Link> {/* Đổi URL nếu cần */}
              </>
            )}
            {/* <Link to="about" className="nav-link">Giới thiệu</Link> */}
          </Nav>
          <Nav className="d-flex align-items-center">
            <Link to="notifications" className="icon-link nav-link position-relative mx-2">
              <i className="fas fa-bell"></i>
              {notifications.length === 0 ? '' : <span className="notification-badge">{notifications.length}</span>}
            </Link>

            <Dropdown align="end" className="mx-2">
              <Dropdown.Toggle variant="dark" id="dropdown-basic" className="icon-link d-flex align-items-center">
                <i className="fas fa-user"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm">
                <Link to="profile" className="dropdown-item text-center text-dark">Hồ sơ</Link>
                <Dropdown.Divider />
                <a className="dropdown-item text-center text-dark" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Đăng xuất
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
