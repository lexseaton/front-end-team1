import express from "express";
import { getJobRoleById, getJobRoles } from "../services/JobRoleService";
import { error } from "node:console";

// method to get all job roles for openJobRoleList.html
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}

// method to get single job role by ID for openJobRoleDetail.html
export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('openJobRoleDetail.html', { openJobRole: await getJobRoleById(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleDetail.html');
    }
}