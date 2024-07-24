import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => 
    
    res.render('jobRoleList.html', { jobRoles: await getJobRoles() });