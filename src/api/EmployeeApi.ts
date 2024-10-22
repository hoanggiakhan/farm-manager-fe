
import EmployeeModel from "../model/EmployeeModel";
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


