import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './component/Dasboard';
import NavbarComponent from './component/navbar/Navbar';
import CropsManagement from './component/crop/CropManager';
import AnimalManagement from './component/animal/AnimalManager';
import EmployeeManagement from './component/employee/EmployeeManager';
import InventoryManagement from './component/inventory/InventoryManager';
import FinancialManagement from './component/finance/FinancialStatistics';
import Reports from './component/Reports';
import Harvest from './component/harvest/Harvest';
import FarmAreas from './component/farm-area/FarmAreas';
import CareProcess from './component/CareProcess';
import UserProfile from './component/profile/Profile';
import About from './about/About';
import Notifications from './component/Notifications';
import Support from './about/Support';
import { Sidebar } from './component/slidebar/Slidebar';
import Login from './component/employee/Login';
import HomePage from './page/HomePage';
import { AuthProvider, useAuth } from './utils/AuthContext'; // Sử dụng useAuth từ AuthContext
import { ConfirmProvider } from 'material-ui-confirm';
import { DataProvider } from './utils/DataContext';
import TaskList from './component/task/TaskList';
import FarmRegistrationForm from './page/FarmRegister';
import PositionForm from './component/PositionForm';
import FarmIntro from './about/About';
import FarmReport from './component/Reports';
import Error403 from './page/Error403';
import Task from './component/TaskEmployee';
import AttendanceTable from './component/AttendanceTable';
import TaskTable from './component/TaskEmployee';
import EmployeeAttendanceTable from './component/employee/AttendanceManager';

const MyRoutes = () => {
  const { userRole, isLoggedIn } = useAuth();
  const isAdmin = userRole === 'ADMIN';
  return (
    <DataProvider>
      <ConfirmProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<FarmRegistrationForm />} />
          <Route
            path='/app'
            element={
              <div>
                {isAdmin && <Sidebar />}
                <div className={`content ${!isAdmin ? 'no-sidebar' : ''}`}>
                  <NavbarComponent className={`custom-navbar ${!isAdmin ? 'full-width' : ''}`} />
                  <div className="main-content">
                    <Outlet />
                  </div>
                </div>
              </div>
            }
          >
            {isAdmin ? (
              <>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="crops" element={<CropsManagement />} />
                <Route path="livestock" element={<AnimalManagement />} />
                <Route path="employees" element={<EmployeeManagement />} />
                <Route path="tasklist" element={<TaskList />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="finance" element={<FinancialManagement />} />
                <Route path="reports" element={<FarmReport/>}/>
                <Route path="harvest" element={<Harvest />} />
                <Route path="farmarea" element={<FarmAreas />} />
                <Route path="careprocess" element={<CareProcess />} />
                {/* <Route path="position" element={<PositionForm />} /> */}
                <Route path="attendance" element={<EmployeeAttendanceTable/>} />
              </>
            ) : (
              <>
              <Route path='*' element={<Error403 />} />
              <Route path='tasks' element={<TaskTable/>} />
              <Route path='attendance' element={<AttendanceTable/>} />
              </>
            )}
            {/* <Route path="about" element={<FarmIntro />} /> */}
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </ConfirmProvider>
    </DataProvider>
  );
};
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
