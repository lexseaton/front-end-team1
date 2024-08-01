import express from "express";
import nunjucks, { } from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";

// import { getAllJobRoles, getJobRoleById } from "./controllers/JobRoleController";
import { dateFilter } from "./filters/DateFilter";
import { getHomepage } from "./controllers/HomeController";

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

// app.get('/openJobRoles', getAllJobRoles);
// app.get('/homepage', getHomepage);

app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect("/loginForm");
});

app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);
app.get('/logout', logout);
// app.get('/openJobRoles', getAllJobRoles);
app.get('/homepage', getHomepage);

