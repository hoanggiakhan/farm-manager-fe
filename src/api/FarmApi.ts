import { FarmRequest } from "../model/FarmRequest";
import { RoleModel } from "../model/RoleModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export const addFarm = async (farm : FarmRequest): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/farm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(farm),
      });
      if (!response.ok) {
        throw new Error(`Lỗi khi thêm farm: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding farm to inventory:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };


  export async function getAllRole(userId : number): Promise<RoleModel[]> {
    const endpoint: string = endpointBE + `/farm/role/${userId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const roleList: RoleModel[] = response.map((roleData: RoleModel) => ({
                ...roleData,
            }));
            return roleList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
}
  