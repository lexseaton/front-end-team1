import express from "express";
import axios from "axios";

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    
    console.log("base url Home Controller = " + axios.defaults.baseURL);
    res.render('homepage.html');
}