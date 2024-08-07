import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";
import { Locations } from "../models/Locations";
import { Capabilities } from "../models/Capabilities";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';
export const URL: string = "/api/openJobRoles/";

export const getJobRoles = async function (): Promise<JobRoleResponse[]> {
    try {
        const response: AxiosResponse = await axios.get(URL);
        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}

export const getSingleJobRole = async function (id: string): Promise<JobRoleDetailResponse[]> {
    try {
        const response: AxiosResponse = await axios.get(URL + id);
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            throw new Error('Job Role Does Not Exist');
        }
        throw new Error('Failed to get Job Role');
    }
}

export const countTotalJobs = async (): Promise<number> => {
    try {
        return (await getJobRoles()).length;
    } catch (error) {
        throw new Error('Failed to count total jobs');
    }
}

export const countFilterTotalJobs = async (location: Locations): Promise<number> => {
    try {
        const jobRoles = await getJobRoles();
        const filterJobRoles = [];
        jobRoles.map((jobRole) => {
            const upperLocation = location.toUpperCase();
            if (jobRole.jobRoleLocation.toString().match(upperLocation)) {
                filterJobRoles.push(jobRole);
            };
        });
        return filterJobRoles.length;
    } catch (error) {
        throw new Error('Failed to count total jobs');
    }
}

export const countFilterCapTotalJobs = async (capability: Capabilities): Promise<number> => {
    try {
        const jobRoles = await getJobRoles();
        const filterJobRolesCap = [];
        jobRoles.map((jobRole) => {
            if (jobRole.jobRoleCapability.toString().match(capability)) {
                filterJobRolesCap.push(jobRole);
            };
        });
        return filterJobRolesCap.length;
    } catch (error) {
        throw new Error('Failed to count total jobs');
    }
}

export const getMostFrequentJobRoleName = async function (): Promise<string> {
    try {
        const jobRoles = await getJobRoles();
        const roleCounts: { [key: string]: number } = {};

        jobRoles.forEach(role => {
            if (role.jobRoleName in roleCounts) {
                roleCounts[role.jobRoleName]++;
            } else {
                roleCounts[role.jobRoleName] = 1;
            }
        });

        let mostFrequentRoleName = '';
        let maxCount = 0;

        for (const roleName in roleCounts) {
            if (roleCounts[roleName] > maxCount) {
                mostFrequentRoleName = roleName;
                maxCount = roleCounts[roleName];
            }
        }

        return mostFrequentRoleName;
    } catch (e) {
        throw new Error('Failed to determine most in demand job role');
    }
}

