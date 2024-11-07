
import AnimalModel from "../model/AnimalModel";
import { SellData } from "../model/SellData";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export async function getAllAnimal(userId : number): Promise<AnimalModel[]> {
    const endpoint: string = endpointBE + `/farm/animals/${userId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const animalList: AnimalModel[] = response.map((animalData: AnimalModel) => ({
                ...animalData,
            }));
            return animalList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
};


export const addAnimal= async (userId: number, animal: AnimalModel): Promise<void> => {
    try {
      const response = await fetch(`${endpointBE}/animal/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(animal),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Lỗi khi thêm vật nuôi: ${response.statusText}. Chi tiết: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding Animal:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };

  export const deleteAnimal = async (animalId: number): Promise<void> => {
    try {
      const response = await fetch(endpointBE + `/animal/delete-animal/${animalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi xóa vật nuôi: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting Animal:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };
  

  export const sellAnimal = async (animalId : number, sellData : SellData , userId : number): Promise<void> => {
    try {
        const response = await fetch(`${endpointBE}/animal/sell-animal/${animalId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(sellData),
        });

        if (!response.ok) {
            throw new Error(`Lỗi khi bán vật nuôi: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error change:', error);
        throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
};