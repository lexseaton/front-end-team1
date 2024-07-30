import express from "express";
import { getToken } from "../services/AuthService";

export class AuthController {

}

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm.html', { error: '' });
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body);
        res.cookie("loggedIn", true);
        res.redirect('/homepage');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('loginForm.html', req.body);
    }
}

export const logout = async (req: express.Request, res: express.Response): Promise<void> => {
    console.log(req.session);
    try {
        req.session.destroy(() => {
            res.cookie("loggedIn", false);
            res.redirect("/homepage");
        });
        req.session = null;
        
    } catch (error) {
        res.locals.errormessage = error.message;
        res.redirect("/homepage");
    }
    console.log(req.session);
}