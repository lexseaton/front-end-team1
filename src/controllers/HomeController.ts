import express from "express";
import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/openJobRoles/";

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html');
}