import { HarvestModel } from "../model/HarvestModel";
import { SellData } from "../model/SellData";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export const addHarvest = async (userId: number, harvest: HarvestModel): Promise<void> => {
    try {
        const response = await fetch(`${endpointBE}/harvest/add-harvest/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(harvest),
        });

        if (!response.ok) {
            throw new Error(`Lỗi khi thêm phiếu thu hoạch: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error adding Harvest:', error);
        throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
};
export const sellHarvest = async (harvestId : number, sellData : SellData): Promise<void> => {
    try {
        const response = await fetch(`${endpointBE}/harvest/sell-products/${harvestId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(sellData),
        });

        if (!response.ok) {
            throw new Error(`Lỗi khi bán nông sản: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error change:', error);
        throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
};
export const getAllHarvest = async (userId: number): Promise<HarvestModel[]> => {
    const endpoint: string = `${endpointBE}/harvest/${userId}`;
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi khi lấy danh sách thu hoạch: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            return data.map((harvestData: HarvestModel) => ({
                ...harvestData,
            }));
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching harvests:", error);
        throw error;
    }
};
