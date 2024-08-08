import MockAdapter from "axios-mock-adapter";
import { requestInstance } from "../../../src/models";
import { ApplicationRequest } from "../../../src/models/ApplicationRequest";
import * as ApplicationsService from "../../../src/services/ApplicationsService";
import { expect } from "chai";
import sinon from 'sinon';



const mock = new MockAdapter(requestInstance);

const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
+ "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
+ "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";

const application: ApplicationRequest = {username: "user", status: "IN_PROGRESS", applicationURL: "testurl.com"}; 

describe("ApplicationsService", () => {
    describe("sendApplication", () => {

        it("should return true when successful", async () => {
            mock.onPost("/api/applications/add", application).reply(200, true);
            const req = { body: application, session: { token: JWTTOKEN } };

            const response = await ApplicationsService.sendApplication(application, req.session.token);
            

            expect(response == true);
        })
    });
});
