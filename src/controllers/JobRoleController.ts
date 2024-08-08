import express from "express";
import { getSingleJobRole, getJobRoles } from "../services/JobRoleService";


export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const order = req.query.order as string;
    const orderBy = req.query.orderBy as string;
    console.log("controller query params" + req.query.order+ req.query.orderBy);
    try {
        const openJobRoles = await getJobRoles(req.session.token, order, orderBy);
        res.render('openJobRoleList.html', { openJobRoles, order, orderBy });
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

