/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import nunjucks, { } from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";

import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";

import { getAllJobRoles, getJobRoleById } from "./controllers/JobRoleController";
import { dateFilter } from "./filters/DateFilter";
import { getHomepage, getTotalFilteredCapNumberOfJobs, getTotalFilteredNumberOfJobs } from "./controllers/HomeController";
=======
import { getAllJobRoles, getJobRoleById } from "./controllers/JobRoleController";
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
app.get('/homepage', allowRoles([UserRole.Admin, UserRole.User]), getHomepage);
app.get('/openJobRoles/:id', allowRoles([UserRole.Admin, UserRole.User]), getJobRoleById);
app.get('/', getLoginForm);
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);
app.get('/logout', logout);

app.get('/homepage', async (req, res) => {
  const totalFilteredJobs = await getTotalFilteredNumberOfJobs(req, res);
  console.log(req.body);
  res.render('homepage.html', { totalFilteredJobs });
});

app.get('/homepage', async (req, res) => {
  const totalFilteredCapJobs = await getTotalFilteredCapNumberOfJobs(req, res);
  res.render('homepage.html', { totalFilteredCapJobs });
});

