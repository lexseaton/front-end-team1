import express from "express";
import { getToken } from "../services/AuthService";
//import * as AuthService from "../services/AuthService";

export class AuthController {

}

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm.html', { error: 'Invalid credentials' });
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    const { Username, Password } = req.body;

    if (!Username) {
        return res.render('loginForm.html', { error: 'Username required'});
    }
    if (!Password){
        return res.render('loginForm.html', { error: 'Password required'});
    }
    try {
        req.body = await getToken(req.body);
        res.redirect('/home');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('loginForm.html', req.body);
    }
}

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('home.html');
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('loginForm.html', req.body);
    }

}