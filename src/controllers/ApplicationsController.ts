import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getApplicationPage = async (req: express.Request, res: express.Response): Promise<void> => {
    const openRoles = await getJobRoles();
    res.render('apply.html', {openJobRole: openRoles[3]});
}