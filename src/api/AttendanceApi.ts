import { AttendanceModel } from "../model/AttendanceModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export async function getAllAttendanceByUserId(userId : number): Promise<AttendanceModel[]> {
    const endpoint: string = endpointBE + `/employee/get-attendances/${userId}`;
    try {
        const response = await request(endpoint);
        
        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const attendanceList: AttendanceModel[] = response.map((attendanceData: AttendanceModel) => ({
                ...attendanceData,
            }));
            return attendanceList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching attendances:", error);
        throw error;
    }
}
