import React from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/JwtService';
import { useAuth } from '../../utils/AuthContext';
import './Navbar.css'; // Import file CSS tùy chỉnh
import { useDataContext } from '../../utils/DataContext';

const NavbarComponent: React.FC = () => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate); // Gọi hàm logout của bạn
    setLoggedIn(false); // Cập nhật trạng thái đăng nhập
  };
  return (
    <Navbar
      bg="success"
      variant="dark"
      expand="lg"
      fixed="top"
      className="custom-navbar"
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold">
          <i className="fas fa-tractor me-2"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <Link to="dashboard" className="nav-link">Dashboard</Link>
            <Link to="livestock" className="nav-link">Quản lý vật nuôi</Link>
            <Link to="crops" className="nav-link">Quản lý cây trồng</Link>
            <Link to="employees" className="nav-link">Quản lý nhân sự</Link>
            <Link to="finance" className="nav-link">Thống kê tài chính</Link>
            <Link to="reports" className="nav-link">Báo cáo</Link>
            <Link to="about" className="nav-link">Giới thiệu</Link>
          </Nav>

          <Nav className="d-flex align-items-center">
            <Link to="notifications" className="icon-link nav-link position-relative mx-2">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </Link>

            <Dropdown align="end" className="mx-2">
              <Dropdown.Toggle variant="dark" id="dropdown-basic" className="icon-link d-flex align-items-center">
                <i className="fas fa-user"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm">
                <Link to="profile" className='dropdown-item text-center text-dark'>
                  Hồ sơ
                </Link>
                <Dropdown.Divider />
                <a
                  className='dropdown-item text-center text-dark'
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout} // Gọi hàm handleLogout
                >
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
