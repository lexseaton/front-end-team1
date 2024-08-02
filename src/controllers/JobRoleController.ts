import express from "express";
import { getSingleJobRole, getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}

export const getJobRoleById = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('openJobRoleDetail.html', { openJobRole: await getSingleJobRole(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleDetail.html');
    }
}