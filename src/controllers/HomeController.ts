import express from "express";

const baseURL = process.env.AWS_URL || 'http://localhost:3000';

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', { baseURL });
}