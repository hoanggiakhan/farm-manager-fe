
import { LocalDate, LocalDateTime, LocalTime } from "js-joda";
import { AttendanceModel } from "../model/AttendanceModel";
import EmployeeModel from "../model/EmployeeModel";
import { NotificationModel } from "../model/NotifiationModel";
import { RoleModel } from "../model/RoleModel";
import TaskModel from "../model/TaskModel";
import { endpointBE } from "../utils/Contants";
import { checkExistUsername } from "../utils/Validation";
import { request } from "./Request";
import { getIdUserByToken } from "../utils/JwtService";

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
export async function getUserById(userId: number): Promise<EmployeeModel> {
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
  

  export const addEmployee = async (userId: number, employee: EmployeeModel): Promise<void> => {
    try {
      const response = await fetch(`${endpointBE}/employee/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Kiểm tra token
        },
        body: JSON.stringify(employee),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Lấy nội dung phản hồi
        throw new Error(`Lỗi khi thêm nhân viên: ${response.statusText}. Chi tiết: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding Employee:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };
  
  export async function getAllNotification(userId : number): Promise<NotificationModel[]> {
    const endpoint: string = endpointBE + `/employee/notifications/${userId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const notificationList: NotificationModel[] = response.map((notificationData: NotificationModel) => ({
                ...notificationData,
            }));
            return notificationList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
}

export const markAsRead = async (id : string): Promise<void> => {
  try {
      const response = await fetch(`${endpointBE}/employee/read/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(id),
      });

      if (!response.ok) {
          throw new Error(`Lỗi khi xem thông báo: ${response.statusText}`);
      }
  } catch (error) {
      console.error('Error change:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
  }
};

export const deleteAllNotifications = async (userId: number): Promise<void> => {
  try {
    const response = await fetch(endpointBE+`/employee/delete-notifications/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi xóa thông báo: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting Notifications:', error);
    throw error; // Ném lỗi để xử lý trong UI nếu cần
  }
};

export async function getAllTaskEmployee(userId : number): Promise<TaskModel[]> {
  const endpoint: string = endpointBE + `/employee/task/${userId}`;
  try {
      const response = await request(endpoint);
      
      // Kiểm tra nếu response là một mảng trước khi gọi map
      if (Array.isArray(response)) {
          const taskList: TaskModel[] = response.map((taskData: TaskModel) => ({
              ...taskData,
          }));
          return taskList;
      } else {
          throw new Error("Unexpected response format");
      }
  } catch (error) {
      console.error("Error fetching Tasks:", error);
      throw error;
  }
}

export const completeTask = async (taskId : number): Promise<void> => {
  try {
      const response = await fetch(`${endpointBE}/employee/task/complete/${taskId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(taskId),
      });

      if (!response.ok) {
          throw new Error(`Lỗi khi hoàn thành công việc: ${response.statusText}`);
      }
  } catch (error) {
      console.error('Error change:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
  }
};

export const checkIn = async (userId: number): Promise<void> => {
  try {
    const response = await fetch(`${endpointBE}/employee/check-in/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Kiểm tra token
      },
      body: JSON.stringify(userId),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Lấy nội dung phản hồi
      throw new Error(`Lỗi khi chấm công: ${response.statusText}. Chi tiết: ${errorText}`);
    }
  } catch (error) {
    console.error('Error adding attendance:', error);
    throw error; // Ném lỗi để xử lý trong UI nếu cần
  }
};




export const checkOut = async (idAttendance: string): Promise<void> => {
  try {
    const response = await fetch(`${endpointBE}/employee/check-out/${idAttendance}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(idAttendance), // Chuyển checkOutTime thành chuỗi JSON
    });

    if (!response.ok) {
      const errorText = await response.text(); // Lấy thông điệp lỗi từ phản hồi
      console.error(`Lỗi khi chấm công ra: ${errorText}`);
      throw new Error(`Lỗi khi chấm công ra: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in checkOut:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm này
  }
};

export const updateEmployee = async (employee: EmployeeModel, id?: number): Promise<void> => {
  const endpoint: string = endpointBE + `/employee/update-user/${employee.employeeId}`;
  
  // Tạo một bản sao của dữ liệu nhân viên mà không bao gồm mật khẩu nếu nó không thay đổi
  const updatedData = {
    fullName: employee.fullName,
    username: employee.username,
    address: employee.address,
    phoneNumber: employee.phoneNumber,
    email: employee.email,
    age: employee.age,
    joinDate: employee.joinDate,
    salary : employee.salary,
    ...(employee.password && { password: employee.password }), // Chỉ thêm password nếu nó không rỗng
  };

  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to update employee: ${error instanceof Error ? error.message : String(error)}`);
  }
};



export const updateProfile = async (employee: EmployeeModel , id ?: number): Promise<void> => {
  const endpoint: string = endpointBE + `/employee/update-user/${id}`;
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       
        fullName : employee.fullName,
        username : employee.username,
        password : employee.password,
        address : employee.address,
        phoneNumber : employee.phoneNumber,
        email : employee.email,
        age : employee.age,
        joinDate : employee.joinDate
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to update employee: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const totalSalary = async (userId : number , total : number): Promise<void> => {
  try {
      const response = await fetch(`${endpointBE}/employee/total-salary/${userId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(total),
      });

      if (!response.ok) {
          throw new Error(`Lỗi khi tính lương: ${response.statusText}`);
      }
  } catch (error) {
      console.error('Error change:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
  }
};

