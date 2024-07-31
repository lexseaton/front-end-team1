import express from "express";
import { baseURL } from "..";


export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', { baseURL });
}