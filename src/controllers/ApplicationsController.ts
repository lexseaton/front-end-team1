import express from "express";
import { getSingleJobRole } from "../services/JobRoleService";
import { jwtDecode } from "jwt-decode";
import { ApplicationRequest } from "../models/ApplicationRequest";
import { sendApplication } from "../services/ApplicationsService";
import { upload } from "../utils/AwsUtils";


export const getApplicationForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('apply.html', {message: "", openJobRole: await getSingleJobRole(req.params.id, req.session.token)});
}

export const uploadCV = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        if (!req.file) {
            res.render("apply.html", {message: "No file provided."});
            return;
        }

        const location = await upload(req);

        const application: ApplicationRequest = {
            username: jwtDecode(req.session.token).sub,
            status: "IN_PROGRESS",
            applicationURL: location
        };
    
        req.body = application;
        postApplicationForm(req, res);
    } catch (err) {
        console.error(err);
        res.render("apply.html", {message: "Failed to upload file."});
    }

}

export const postApplicationForm = async (req: express.Request, res: express.Response): Promise<void> => {

    try {
        sendApplication(req.body, req.session.token);
        res.render("apply.html", {message: "Application Successful"});
    } catch (error) {
        res.render("apply.html", {message: "Application Failed"});
    }

}