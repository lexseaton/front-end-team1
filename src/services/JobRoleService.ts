import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";
import { getHeader } from "./AuthUtil";
import { getLoginForm } from "../controllers/AuthController";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';
export const URL: string = "/api/openJobRoles/";

export const getJobRoles = async (token: string ): Promise<JobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(URL, getHeader(token));
        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}

export const getSingleJobRole = async function (id: string, token: string ): Promise<JobRoleDetailResponse[]> {
    
    try {
        const response: AxiosResponse = await axios.get(URL + id, getHeader(token));
        return response.data;
    } catch (e) {
            if (e.response.status === 404) {
                throw new Error('Job Role Does Not Exist');
            }
        throw new Error('Failed to get Job Role');
    }
}