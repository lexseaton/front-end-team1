import { afterEach, describe, it } from "node:test";
import * as AuthController from "../../../src/controllers/AuthController";
import * as AuthService from "../../services/AuthService";
import { expect } from 'chai';

import sinon from 'sinon';

const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
+ "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
+ "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";

declare module "express-session" {
    interface SessionData {
      token: string;
    }
  }

describe('LoginController', function () {

    afterEach(() => {
        sinon.restore();
    });

    //Tests if login for appears
    describe('getLoginForm', function () {
        it('should render the login form', async () => {

            sinon.stub(AuthService, 'getToken').resolves(JWTTOKEN);

            const req = { session: { token: "" } };
            const res = { render: sinon.spy() };

            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            await AuthController.getLoginForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
        })
    })

    // Test successful login
    it('should login successfully with correct credentials', async () => {
        // Mock the getToken function to return a resolved promise with loginResponse
        sinon.stub(AuthService, 'getToken').resolves(JWTTOKEN);

        const req = { body: { Username: "admin", Password: "admin" }, session: { token: "" } };
        const res = { redirect: sinon.spy(), render: sinon.spy() };

        // Call the login function from AuthController
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await AuthController.postLoginForm(req as any, res as any);

        // Verify that res.redirect was called once with the correct arguments
        expect(JWTTOKEN == req.session.token).to.be.true;
        expect(res.redirect.calledOnce).to.be.true;
    });

    it('should fail login with incorrect credentials', async () => {
        const errormessage: string = "Invlid Credentials";
        // Mock the getToken function to return a rejected promise
        sinon.stub(AuthService, 'getToken').rejects(new Error(errormessage));

        const req = { body: { Username: "admin", Password: "wrongpassword" } };
        const res = { render: sinon.spy(), locals: { errormessage: ''} };
        
        
        // Call the login function from AuthController
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await AuthController.postLoginForm(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.locals.errormessage).to.equal(errormessage);

    });

});

