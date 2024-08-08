import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";
import { getHeader } from "./AuthUtil";
import { JwtToken } from "../models/JwtToken";
import { getToken } from "./AuthService";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';
export const URL: string = "/api/openJobRoles/";

interface Params {
    order?: string;
    orderBy?: string;
}

export const getJobRoles = async ( token: string, order?: string, orderBy?: string ): Promise<JobRoleResponse[]>=> {
    try {
       let queryUrl = '';
            if(order && orderBy){
                queryUrl = order+'/'+orderBy;
            }
            console.log(" service query url" + queryUrl);
        const response: AxiosResponse = await axios.get(URL+ queryUrl);   
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
