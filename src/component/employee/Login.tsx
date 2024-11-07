import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpointBE } from '../../utils/Contants';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './RequireAdmin';
import { useAuth } from '../../utils/AuthContext';
import { toast } from 'react-toastify';

const Login: React.FC = () => {

  const navigation = useNavigate();
  const { isLoggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigation("/login");
    }
  });
  // Biến cần thiết
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const loginRequest = {
      username,
      password,
    };

    fetch(endpointBE + "/employee/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(async (data) => {
        const { jwtToken } = data;
        const decodedToken = jwtDecode(jwtToken) as JwtPayload;
        alert("Đăng nhâp thành công");
        setLoggedIn(true); // Đã đăng nhập
        localStorage.setItem("token", jwtToken);
        // Kiểm tra role để chuyển về link
        if (decodedToken.role === "ADMIN") {
          navigation("/app/dashboard");
        } else {
          navigation("/app/tasks");
        }
      })
      .catch((error) => {
        console.log("Lỗi đăng nhập: " + error);
        setError("Tài khoản hoặc mật khẩu không đúng");
        alert("Tài khoản hoặc mật khẩu không đúng");
      });
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-9 col-12">
          <div className="card shadow-lg rounded-5 my-5">
            <div className="card-body p-4">
              <h1 className="text-center mb-4">ĐĂNG NHẬP</h1>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleSubmit} className="form">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e: any) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between mt-2 px-1">
                  <span>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                  </span>
                  <Link to="/forgot-password">Quên mật khẩu</Link>
                </div>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
