import express from "express";
import { getToken } from "../services/AuthService";
import { error } from "console";

export class AuthController {

}

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm.html', { error: '' });
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getToken(req.body);
        res.redirect('/homepage');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('loginForm.html', req.body);
    }
}

export const logout = async (req: express.Request, res: express.Response): Promise<void> => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.clearCookie('connect.sid');
    res.removeHeader; 
    console.log(req.session.token);
    req.sessionID = undefined;
    req.session.token = undefined; 
    req.session.destroy((error) => {
        if(error) {
            return res.redirect('/loginForm');
        }
    })

    console.log("session ID: " + req.sessionID);
    console.log("cookie name: " + res.cookie.name);
    
    const noCacheUrl = '/loginForm?nocache=' + new Date().getTime();
    res.redirect(noCacheUrl);
   // res.redirect('/loginForm');
}
