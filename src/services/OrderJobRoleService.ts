import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { Order } from "../models/Order";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';
export const URL: string = "/api/openJobRoles/order";

export const getJobRolesByOrder = async function (order: Order): Promise<JobRoleResponse[]> {
    try {
        const response: AxiosResponse = await axios.get(URL + order);
        return response.data;
    } catch (e) {
            if (e.response.status === 404) {
                throw new Error('This order Does Not Exist');
            }
        throw new Error('Failed to get Job Roles');
    }
}
