import { AxiosResponse } from "axios";
import { requestInstance } from "../models";
import { ApplicationRequest } from "../models/ApplicationRequest";

requestInstance.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';

export const sendApplication = async (application: ApplicationRequest): Promise<boolean> => {
    try {
        const response: AxiosResponse = (await requestInstance.post("/api/applications/add", application));
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}