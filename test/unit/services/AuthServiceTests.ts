import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getToken} from "../../../src/services/AuthService";
import { LoginRequest } from "../../../src/models/LoginRequest";
import { jwtDecode } from "jwt-decode";

const mock = new MockAdapter(axios);

describe("AuthService", function() {
    // this.afterEach(() => {
    //     mock.restore();
    // });
describe("getToken", function () {
    it("should return jwttoken when valid credentials are passed", async () => {
        mock.restore();
        const data: LoginRequest = {Username: 'admin',
                                    Password: 'admin'};
        const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
        + "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
        + "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";
        
        mock.onPost("http://localhost:3000/api/auth/login", {username: "admin", password: "admin"}).reply(200, JWTTOKEN);

        const result = await getToken(data);

        const decodedToken = jwtDecode(result);



        expect(decodedToken.iss == 'team1-api').to.be.true;
        expect(decodedToken.sub == 'admin').to.be.true;
    })
})
});