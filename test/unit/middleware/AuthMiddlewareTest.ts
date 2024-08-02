// import { expect } from 'chai';
// import sinon from "sinon";
// import * as AuthMiddleware from "../../../src/middleware/AuthMiddleware";
// import { UserRole } from "../../../src/models/JwtToken";
// import { AuthController } from '../../../src/controllers/AuthController';

// const JWTTOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3MTQsI
// mV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJpc3MiOiJ0Z
// WFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU`;

// describe('AuthMiddleware', function () {
// describe('allowRoles', function () {
    
//     it('should render login form error message when not logged in error thrown', async () => {
//     const errorMessage: string = 'Please log in';
//      // const stubAuthController  = sinon.stub(AuthController, 'getLoginForm').rejects(new Error(errorMessage)
//     const stub = sinon.stub(AuthMiddleware, 'allowRoles').rejects(new Error(errorMessage));
    
//    // const req = { session: {token: JWTTOKEN}}
//     const res = { render: sinon.spy(), locals: { errorMessage: '' } };

//     const userArray = [UserRole.Admin, UserRole.User]
//     await AuthMiddleware.allowRoles(userArray); // eslint-disable-line @typescript-eslint/no-explicit-any

//     expect(res.locals.errorMessage).to.equal(errorMessage);

//     // Restore the stub
//     stub.restore();
//     })
//     })
//   });