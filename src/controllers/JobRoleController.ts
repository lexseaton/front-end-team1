import express, { response } from "express";
import { getJobRoles } from "../services/JobRoleService";
import axios from "axios";
import { baseURL } from "../index";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        
       // console.log("base url Job Controller = " + axios.defaults.baseURL);
        console.log("base url Job Controller = " + baseURL);
        res.render('openJobRoleList.html', { openJobRoles: await getJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('openJobRoleList.html');
    }
}