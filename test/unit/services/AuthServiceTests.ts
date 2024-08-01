import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getToken} from "../../../src/services/AuthService";
import { LoginRequest } from "../../../src/models/LoginRequest";
import { jwtDecode } from "jwt-decode";
import { requestInstance } from "../../../src/models";

const mock = new MockAdapter(requestInstance);

describe("AuthService", function() {
describe("getToken", function () {
    after (() => {
        mock.reset();
    });
    it("should return jwttoken when valid credentials are passed", async () => {
        const data: LoginRequest = {username: 'admin',
                                    password: 'admin'};
        const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
        + "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
        + "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";
        
        mock.onPost("/api/auth/login", data).reply(200, JWTTOKEN);

        const result = await getToken(data);

        const decodedToken = jwtDecode(result);


        expect(result == JWTTOKEN).to.be.true;
        expect(decodedToken.iss == 'team1-api').to.be.true;
        expect(decodedToken.sub == 'admin').to.be.true;
    })
})
});