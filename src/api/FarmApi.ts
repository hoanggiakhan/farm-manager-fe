import { FarmRequest } from "../model/FarmRequest";
import { endpointBE } from "../utils/Contants";

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