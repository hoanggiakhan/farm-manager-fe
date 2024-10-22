import TaskModel from "../model/TaskModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export async function getAllTask(userId: number): Promise<TaskModel[]> {
    const endpoint: string = endpointBE + `/task/${userId}`;
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
        console.error("Error fetching tasks:", error);
        throw error;
    }
}


export const addTask = async (inventoryId: number, item: ItemModel): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/inventory/add-item/${inventoryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi thêm sản phẩm: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding item to inventory:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };