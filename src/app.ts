import express from "express";
import nunjucks, { } from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { getAllJobRoles } from "./controllers/JobRoleController";
import { dateFilter } from "./filters/DateFilter";
import { getHomepage } from "./controllers/HomeController";
import { allowRoles } from "./middleware/AuthMiddleware";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
import { UserRole } from "./models/JwtToken";

const app = express();

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

env.addFilter('date', dateFilter);
app.use(express.static('public'));
app.set('view engine', 'html');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/openJobRoles', allowRoles([UserRole.Admin, UserRole.User]), getAllJobRoles);
app.get('/homepage',allowRoles([UserRole.Admin, UserRole.User]), getHomepage);
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);
app.get('/logout', logout);


