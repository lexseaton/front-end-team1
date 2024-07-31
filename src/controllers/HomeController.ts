import express from "express";
import axios from "axios";

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    
    res.render('homepage.html');
}