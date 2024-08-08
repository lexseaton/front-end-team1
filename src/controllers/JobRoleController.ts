import express from "express";
import { getSingleJobRole, getJobRoles, getJobRolesByOrder } from "../services/JobRoleService";
import { Order } from "../models/Order";



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
        res.render('openJobRoleDetail.html', { openJobRole: await getSingleJobRole(req.params.id, req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleDetail.html');
    }
}

export const getJobRolesOrdered = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('openJobRoleList.html', { openJobRoles: await getJobRolesByOrder(req.params.order, req.params.orderBy) });
        console.log("ordered controller response " +res.json);
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}
