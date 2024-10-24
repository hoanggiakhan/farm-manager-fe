
import InventoryModel from "../model/InventoryModel";
import ItemModel from "../model/ItemModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export async function getAllInventory(userId : number): Promise<InventoryModel[]> {
    const endpoint: string = endpointBE + `/farm/inventories/${userId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const inventoryList: InventoryModel[] = response.map((inventoryData: InventoryModel) => ({
                ...inventoryData,
            }));
            return inventoryList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}

export async function getAllItemByInventory(inventoryId : number|null): Promise<ItemModel[]> {
    const endpoint: string = endpointBE + `/inventory/items/${inventoryId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const itemList: ItemModel[] = response.map((itemData: ItemModel) => ({
                ...itemData,
            }));
            return itemList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}

export const addItemToInventory = async (inventoryId: number, item: ItemModel): Promise<void> => {
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
  export const addInventory = async (userId : number): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/inventory/add-inventory/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userId),
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi thêm kho: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding Inventory:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };

  export const deleteItemFromInventory = async (itemId: number): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/inventory/delete-item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi xóa sản phẩm: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting item from inventory:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };

  export const deleteInventory = async (inventoryId: number): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/inventory/delete-inventory/${inventoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi xóa kho: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting Inventory:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };
  