import axios, { AxiosResponse } from "axios";
import { OpenJobRoleResponse } from "../models/OpenJobRoleResponse";
import { getHeader } from "./AuthUtil";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/openJobRoles/";

export const getJobRoles = async (token: string ): Promise<OpenJobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(URL, getHeader(token));
        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}