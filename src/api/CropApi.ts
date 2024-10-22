import CropModel from "../model/CropModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export async function getAllCrop(userId: number): Promise<CropModel[]> {
    const endpoint: string = endpointBE + `/farm/crops/${userId}`;
    try {
        const response = await request(endpoint);

        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const cropList: CropModel[] = response.map((cropData: CropModel) => ({
                ...cropData,
            }));
            return cropList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching crops:", error);
        throw error;
    }
}

// export async function getAllCrop(): Promise<CropModel[]> {
//     const endpoint: string = endpointBE + `/crops`;
//     try {
//         const response = await request(endpoint);

//         // Kiểm tra nếu response chứa embedded data
//         if (response && response._embedded && Array.isArray(response._embedded.crops)) {
//             const cropList: CropModel[] = response._embedded.crops.map((cropData: any) => ({
//                 ...cropData,
//                 // Bạn có thể tùy chỉnh các trường khác ở đây nếu cần
//             }));
//             return cropList;
//         } else {
//             throw new Error("Unexpected response format");
//         }
//     } catch (error) {
//         console.error("Error fetching crops:", error);
//         throw error;
//     }
// }


export async function getAllCropFarm(): Promise<CropModel[]> {
    const endpoint: string = endpointBE + `/farms`;
    const response = await request(endpoint);

    const data = response._embedded.farms.map((farmData: any) => {
        // Duyệt qua mảng listUsers trong mỗi vai trò (role)
        const crops = farmData._embedded.crops.map((cropData: any) => {
            // Xử lý các trường dữ liệu trong userData tại đây
            const crop: CropModel = {
                cropId: cropData.cropId,  // mã cây trồng
                cropName: cropData.cropName,  // tên cây trồng
                sellPrice: cropData.sellPrice,  // giá bán
                importPrice: cropData.importPrice, // giá nhập
                quantity: cropData.quantity,  // số lượng
                status: cropData.status, // trạng thái
                age: cropData.age,
                plantingDay: cropData.plantingDay, // ngày gieo trồng
                acreage: cropData.acreage, // diện tích gieo trồng
                productivity: cropData.productivity, // năng suất
            };
            return crop;
        });
        return crops;
    });

    return data;
}