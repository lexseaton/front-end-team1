import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/openJobRoles/";

// method for viewing all job roles on openJobRoleList.html
export const getJobRoles = async function (): Promise<JobRoleResponse[]> {
    try {
        const response: AxiosResponse = await axios.get(URL);
        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}

// new method to get jobRoleById (need to create a new model to pass into Promise?)
export const getJobRoleById = async function (id: string): Promise<JobRoleDetailResponse[]> {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/openJobRoles/" + id);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Role');
    }
}