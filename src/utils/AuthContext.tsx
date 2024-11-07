// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getRoleByToken, isToken } from "./JwtService";

// interface AuthContextProps {
// 	children: React.ReactNode;
// }

// interface AuthContextType {
// 	isLoggedIn: boolean;
// 	setLoggedIn: any;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<AuthContextProps> = (props) => {
// 	const [isLoggedIn, setLoggedIn] = useState(isToken());
// 	return (
// 		<AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
// 			{props.children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = (): AuthContextType => {
// 	const context = useContext(AuthContext);
// 	if (!context) {
// 		throw new Error("Lỗi context");
// 	}
// 	return context;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { getRoleByToken, isToken } from "./JwtService";

// Định nghĩa kiểu dữ liệu cho AuthContextProps
interface AuthContextProps {
	children: React.ReactNode;
}

// Định nghĩa kiểu dữ liệu cho AuthContextType
interface AuthContextType {
	isLoggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	userRole: string | null;
}

// Khởi tạo AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState<boolean>(isToken()); // Kiểm tra xem người dùng đã đăng nhập hay chưa
	const [userRole, setUserRole] = useState<string | null>(null); // Lưu trữ vai trò người dùng

	// Cập nhật vai trò của người dùng nếu đã đăng nhập
	useEffect(() => {
		if (isLoggedIn) {
			const role = getRoleByToken(); // Lấy vai trò từ token
			setUserRole(role);
		} else {
			setUserRole(null);
		}
	}, [isLoggedIn]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setLoggedIn, userRole }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("Lỗi: AuthContext không có trong phạm vi sử dụng");
	}
	return context;
};

