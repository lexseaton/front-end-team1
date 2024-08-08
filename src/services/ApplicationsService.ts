import { AxiosResponse } from "axios";
import { requestInstance } from "../models";
import { ApplicationRequest } from "../models/ApplicationRequest";
import { getHeader } from "./AuthUtil";

requestInstance.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';

export const sendApplication = async (application: ApplicationRequest, token: string): Promise<boolean> => {
    try {
        const response: AxiosResponse = (await requestInstance.post("/api/applications/add", application, getHeader(token)));
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}