import express from "express";
import { getJobRoles } from "../services/JobRoleService";
import axios, { Axios } from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        console.log("base url Controller = " + axios.defaults.baseURL);
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}