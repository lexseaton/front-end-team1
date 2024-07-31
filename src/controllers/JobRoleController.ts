import express, { response } from "express";
import { getJobRoles } from "../services/JobRoleService";
import { baseURL } from "../index";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        console.log("base url Job Controller = " + baseURL);
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}