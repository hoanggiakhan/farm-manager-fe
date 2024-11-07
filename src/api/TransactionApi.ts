import { TransactionModel } from "../model/TransactionModel";
import { endpointBE } from "../utils/Contants";
import { request } from "./Request";

export async function getAllTransaction(userId: number): Promise<TransactionModel[]> {
    const endpoint: string = endpointBE + `/farm/transactions/${userId}`;
    try {
        const response = await request(endpoint);

        // Kiểm tra nếu response là một mảng trước khi gọi map
        if (Array.isArray(response)) {
            const transcationList: TransactionModel[] = response.map((transactionData: TransactionModel) => ({
                ...transactionData,
            }));
            return transcationList;
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}