import { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { requestInstance } from "../models";

export const getToken = async function (loginRequest: LoginRequest): Promise<string>{
try {
    const response: AxiosResponse = await requestInstance.post("/api/auth/login", loginRequest);
    return response.data;
} catch (e) {
    console.log(e);
    throw new Error(e.response.data);
}
}
