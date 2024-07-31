import express from "express";

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    
    res.render('homepage.html');
}