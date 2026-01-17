import type { CoffeeLogDetailResponse, CoffeeLogRequest, CoffeeLogSummaryResponse } from "../types";
import apiClient from "./axios";

const BASE_URL = '/hobby/coffeeLog';

export const getCoffeeLogs = async () : Promise<CoffeeLogSummaryResponse[]> => {
    const response = await apiClient.get<CoffeeLogSummaryResponse[]>(BASE_URL);
    return response.data;
}

export const getCoffeeLog = async (logId: number) : Promise<CoffeeLogDetailResponse> => {
    const response = await apiClient.get<CoffeeLogDetailResponse>(`${BASE_URL}/${logId}`);
    return response.data;
}

export const saveCoffeeLog = async (data: CoffeeLogRequest) : Promise<number> => {
    const response = await apiClient.post<number>(BASE_URL, data);
    return response.data;
}

export const updateCoffeeLog = async (logId: number, data: CoffeeLogRequest) : Promise<void> => {
    await apiClient.put(`${BASE_URL}/${logId}`, data);
}

export const deleteCoffeeLog = async (logId: number) : Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${logId}`);
}