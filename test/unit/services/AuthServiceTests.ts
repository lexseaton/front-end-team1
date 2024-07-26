import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getToken } from "../../../src/services/AuthService";

const mock = new MockAdapter(axios);

describe("AuthService");
describe("getToken", function () {
    it("should return jwttoken when valid credentials are passed", async () => {
        const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
        + "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
        + "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";

        mock.onPost("http://localhost:8080/api/auth/login", {Username: "admin", Password: "admin"}).reply(200, JWTTOKEN);

        const result = await getToken({Username:"admin", Password:"admin"});

        expect(result == JWTTOKEN).to.be.true;
    })
});