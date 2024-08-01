import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { requestInstance } from "../models";


axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';


    export const getToken = async function (loginRequest: LoginRequest): Promise<string>{
        try {
            const response: AxiosResponse = await requestInstance.post("/api/auth/login", loginRequest);
            return response.data;
        } catch (e) {
            console.log("data: " + e.response.data + "response code " + e.response.status);
            throw new Error(e.response.data);
        }
        }





