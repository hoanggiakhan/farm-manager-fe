import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes, useNavigate } from 'react-router-dom';
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
import { AuthProvider } from './utils/AuthContext';
import { ConfirmProvider } from 'material-ui-confirm';
import { getIdUserByToken } from './utils/JwtService';
import CropModel from './model/CropModel';
import AnimalModel from './model/AnimalModel';
import { getAllAnimal } from './api/AnimalApi';
import { getAllCrop } from './api/CropApi';
import PrivateRoute from './utils/PrivateRoute';
import { DataProvider } from './utils/DataContext';
import TaskList from './component/task/TaskList';
import FarmRegistrationForm from './page/FarmRegister';
import PositionForm from './component/PositionForm';


const App: React.FC = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
        <ConfirmProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<FarmRegistrationForm/>}/>
            {/* Layout for pages with sidebar and navbar */}
            <Route
              path='/app'
              element={
                  <div>
                    <Sidebar />
                    <div className="content">
                      <NavbarComponent />
                      <div className="main-content">
                        <Outlet />
                      </div>
                    </div>
                  </div>
              }
            >
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="crops" element={<CropsManagement />} />
              <Route path="livestock" element={<AnimalManagement />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="tasklist" element={<TaskList/>} />
              <Route path="inventory" element={<InventoryManagement />} />
              <Route path="finance" element={<FinancialManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="harvest" element={<Harvest />} />
              <Route path="farmarea" element={<FarmAreas />} />
              <Route path="careprocess" element={<CareProcess />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="about" element={<About />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="support" element={<Support/>}/>
              <Route path="position" element={<PositionForm/>}/>
            </Route>
          </Routes>
        </ConfirmProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
