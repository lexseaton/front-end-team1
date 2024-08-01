import express from "express";

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    console.log("getHomepage req: " + res.status);
    res.render('homepage.html');
}