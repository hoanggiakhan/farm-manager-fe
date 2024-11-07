import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../component/employee/RequireAdmin";
export function isTokenExpired(token: string) {
   const decodedToken = jwtDecode(token);

   if (!decodedToken.exp) {
      // Token không có thời gian hết hạn (exp)
      return false;
   }

   const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

   return currentTime < decodedToken.exp;
}

export function isToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return true;
   }
   return false;
}


export function getAvatarByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.avatar;
   }
}

export function getLastNameByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.lastName;
   }
}

export function getUsernameByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return jwtDecode(token).sub;
   }
}

export function getIdUserByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.id;
   }
}

// export function getRoleByToken() {
//    const token = localStorage.getItem('token');
//    if (token) {
//       const decodedToken = jwtDecode(token) as JwtPayload;
//       return decodedToken.role;
//    }
// }
export function getRoleByToken() {
   const token = localStorage.getItem("token");
   return token ? (jwtDecode<JwtPayload>(token).role || null) : null;
 }
 
export function logout(navigate: any) {
   navigate("/");
   localStorage.removeItem('token');
}

// export function login(token: string) {
//    localStorage.setItem("token", token);
//    window.dispatchEvent(new CustomEvent("tokenChanged")); // Phát sự kiện khi đăng nhập
//  }
 
//  export function logout(navigate : any) {
//    navigate("/");
//    localStorage.removeItem("token");
//    window.dispatchEvent(new CustomEvent("tokenChanged")); // Phát sự kiện khi đăng xuất
//  }