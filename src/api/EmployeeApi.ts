
import EmployeeModel from "../model/EmployeeModel";
import { RoleModel } from "../model/RoleModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

async function getEmployee(endpoint: string): Promise<EmployeeModel> {
    // Gọi phương thức request()
    const response = await request(endpoint);
 
    return response;
}

export async function getAllEmployee(userId : number): Promise<EmployeeModel[]> {
    const endpoint: string = endpointBE + `/farm/employees/${userId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const userList: EmployeeModel[] = response.map((userData: EmployeeModel) => ({
                ...userData,
            }));
            return userList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}

// export async function getRole(userId : number): Promise<RoleModel[]> {
//     const endpoint: string = endpointBE + `/farm/employees/${userId}`;
//     try {
//         const response = await request(endpoint);
        
//         // Kiểm tra nếu response là một mảng trước khi gọi map
//         if (Array.isArray(response)) {
//             const userList: EmployeeModel[] = response.map((userData: EmployeeModel) => ({
//                 ...userData,
//             }));
//             return userList;
//         } else {
//             throw new Error("Unexpected response format");
//         }
//     } catch (error) {
//         console.error("Error fetching employees:", error);
//         throw error;
//     }
// };

export async function getUserById(userId: string): Promise<EmployeeModel> {
    const endpoint: string = `${endpointBE}/employees/${userId}`;
    try {
        const response = await request(endpoint);

        // Kiểm tra nếu response chứa dữ liệu hợp lệ
        if (response && typeof response === 'object') {
            const user: EmployeeModel = {
                ...response,
                // Tùy chỉnh các trường lồng ghép nếu cần
            };
            return user;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
}

export const deleteEmployee = async (employeeId: number): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/employee/delete-employee/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi xóa nhân viên: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting Employee:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };


  export const addRole = async (userId : number , role : RoleModel): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/role/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(role),
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi thêm vị trí: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding Position:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };
  
