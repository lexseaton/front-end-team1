import express from "express";
import { getSingleJobRole } from "../services/JobRoleService";
import { jwtDecode } from "jwt-decode";
import { ApplicationRequest } from "../models/ApplicationRequest";
import { sendApplication } from "../services/ApplicationsService";
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();


export const getApplicationForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('apply.html', {message: "", openJobRole: await getSingleJobRole(req.params.id, req.session.token)});
}

export const uploadCV = async (req: express.Request, res: express.Response): Promise<void> => {
    if (!req.file) {
        res.render("apply.html", {message: "No file provided."});
        return;
    }

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: Date.now().toString() + '-' + req.file.originalname,
        Body: req.file.buffer
    };

    try {
        const data = await s3.upload(uploadParams).promise();

        const application: ApplicationRequest = {
            username: jwtDecode(req.session.token).sub,
            status: "IN_PROGRESS",
            applicationURL: data.Location
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