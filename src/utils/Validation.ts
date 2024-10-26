import { request } from "../api/Request";
import { endpointBE } from "./Contants";

// Hàm check email xem tồn tại chưa
export const checkExistEmail = async (setErrorEmail: any, email: string) => {
   const endpoint = endpointBE + `/employees/search/existsByEmail?email=${email}`;
   // Call api
   try {
      const response = await fetch(endpoint);
      const data = await response.text();
      if (data === "true") {
         setErrorEmail("Email đã tồn tại!");
         return true;
      }
      return false;
   } catch (error) {
      console.log("Lỗi api khi gọi hàm kiểm tra email");
   }
};

// Hàm check username xem tồn tại chưa
export const checkExistUsername = async (username: string): Promise<Boolean> => {
    // Kiểm tra nếu username rỗng hoặc chỉ chứa khoảng trắng
    if (username.trim() === "") {
      return false;
    }
  
    const endpoint = `${endpointBE}/employees/search/existsByUsername?username=${username}`;
  
    try {
      // Gọi API kiểm tra username
      const response = await request(endpoint);
  
      // Giả sử API trả về đối tượng có thuộc tính 'exists' để cho biết username đã tồn tại hay chưa
      if (response.exists) {
        return true;
      }
  
      return false;
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error("Lỗi API khi gọi hàm kiểm tra username:", error);
      return false; // Có thể trả về false nếu có lỗi
    }
  };
  
// Hàm check mật khẩu có đúng định dạng không
export const checkPassword = (setErrorPassword: any, password: string) => {
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
   if (password === "") {
      return false;
   } else if (!passwordRegex.test(password)) {
      setErrorPassword(
         "Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ và số."
      );
      return true;
   } else {
      setErrorPassword("");
      return false;
   }
};

// Hàm check mật khẩu nhập lại
export const checkRepeatPassword = (setErrorRepeatPassword: any, repeatPassword: string, password: string) => {
   if (repeatPassword !== password) {
      setErrorRepeatPassword("Mật khẩu không khớp.");
      return true;
   } else {
      setErrorRepeatPassword("");
      return false;
   }
};

// Hàm check số điện thoại có đúng định dạng không
export const checkPhoneNumber = (setErrorPhoneNumber: any, phoneNumber: string) => {
   const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
   if (phoneNumber.trim() === "") {
      return false;
   } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
      setErrorPhoneNumber("Số điện thoại không đúng.");
      return true;
   } else {
      setErrorPhoneNumber("");
      return false;
   }
};