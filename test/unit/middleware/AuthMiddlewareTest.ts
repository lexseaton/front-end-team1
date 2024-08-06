import { expect } from 'chai';
import sinon from 'sinon';
import express from "express";
import { allowRoles } from "../../../src/middleware/AuthMiddleware";
import { UserRole, JwtToken } from "../../../src/models/JwtToken";
import "core-js/stable/atob";

const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
+ "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
+ "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";

describe('Middleware', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('allowRoles', function () {
        it('should render LoginPage view and return 401 status, when user is NOT logged in', async () => {

            const req = {
                session: { token: '' }
            };
            const errorMessage: string = 'Please log in';

            const res = {
                status: sinon.stub().returnsThis(),
                redirect: sinon.stub().returnsThis(),
                locals: { errormessage: '' }
            };

            const next = sinon.stub();

            const middleware = allowRoles([UserRole.Admin, UserRole.User]);

            await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

            expect((res.status as sinon.SinonStub).calledWith(401)).to.be.true;
            expect(req.session.token).to.equal('');
            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/loginForm')).to.be.true;
        });
    });
    
});