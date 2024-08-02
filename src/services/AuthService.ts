import { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { requestInstance } from "../models";

requestInstance.defaults.baseURL = process.env.API_URL || 'http://localhost:8080'; 

export const getToken = async function (loginRequest: LoginRequest): Promise<string>{
try {
    const response: AxiosResponse = await requestInstance.post("/api/auth/login", loginRequest);
    return response.data;
} catch (e) {
    throw new Error(e.response.data);
}
}
