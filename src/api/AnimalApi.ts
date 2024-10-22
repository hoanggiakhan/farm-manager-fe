
import AnimalModel from "../model/AnimalModel";
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
}
// export async function getAllAnimal(userId : number): Promise<AnimalModel[]> {
//     const endpoint: string = endpointBE + `/farm/animals/${userId}`;
//     try {
//         const response = await request(endpoint);

//         // Kiểm tra nếu response chứa embedded data
//         if (response && response._embedded && Array.isArray(response._embedded.animals)) {
//             const animalList: AnimalModel[] = response._embedded.animals.map((animalData: any) => ({
//                 ...animalData,
//                 // Tùy chỉnh nếu cần thiết để xử lý các trường lồng ghép
//                 type: animalData.type || null,  // Ví dụ trường lồng ghép
//                 owner: animalData.owner || null, // Ví dụ trường lồng ghép khác
//             }));
//             return animalList;
//         } else {
//             throw new Error("Unexpected response format");
//         }
//     } catch (error) {
//         console.error("Error fetching animals:", error);
//         throw error;
//     }
// }
