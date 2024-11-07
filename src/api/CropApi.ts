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
                type : cropData.type
            };
            return crop;
        });
        return crops;
    });

    return data;
}

export const deleteCrop = async (cropId: number): Promise<void> => {
    try {
      const response = await fetch(endpointBE+`/crop/delete-crop/${cropId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Lỗi khi xóa cây trồng: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting Crop:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };
  
  export const addCrop = async (userId: number, crop: CropModel): Promise<void> => {
    try {
      const response = await fetch(`${endpointBE}/crop/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Kiểm tra token
        },
        body: JSON.stringify(crop),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Lấy nội dung phản hồi
        throw new Error(`Lỗi khi thêm cây trồng: ${response.statusText}. Chi tiết: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding Crop:', error);
      throw error; // Ném lỗi để xử lý trong UI nếu cần
    }
  };

  export const updateCrop = async (userId: number, crop: CropModel): Promise<void> => {
    const endpoint: string = endpointBE + `/crop/update/${crop.cropId}`;
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          cropName: crop.cropName,
          sellPrice: crop.sellPrice,
          importPrice: crop.importPrice,
          quantity: crop.quantity,
          status: crop.status,
          age: crop.age,
          plantingDay: crop.plantingDay,
          acreage: crop.acreage,
          productivity: crop.productivity,
          type: crop.type,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update crop: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Failed to update crop: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  