import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoles, URL } from '../../../src/services/JobRoleService';
import { OpenJobRoleResponse } from "../../../src/models/OpenJobRoleResponse";
import { Locations } from "../../../src/models/Locations";

const dt = new Date(2024, 11, 29);

const openJobRoleResponse: OpenJobRoleResponse = {
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: "HR",
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt
}
const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
describe('getJobRoles', function () {
  it('should return job roles from response', async () => {
      const data = [openJobRoleResponse];

      mock.onGet(URL).reply(200, data);

      const JWTTOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3MTQsI
        mV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJpc3MiOiJ0Z
        WFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU`;
        

      const results = await getJobRoles(JWTTOKEN);

      expect(results[0].jobRoleBand).to.deep.equal(openJobRoleResponse.jobRoleBand);
      expect(results[0].jobRoleLocation).to.deep.equal(openJobRoleResponse.jobRoleLocation);
      expect(results[0].jobRoleName).to.deep.equal(openJobRoleResponse.jobRoleName);
      expect(results[0].jobRoleCapability).to.deep.equal(openJobRoleResponse.jobRoleCapability);
      expect(results[0].jobRoleClosingDate.toString() == openJobRoleResponse.jobRoleClosingDate.toISOString()).to.be.true;
    })

  it('should throw exception when 500 error returned from axios', async () => {
      mock.onGet(URL).reply(500);
      const JWTTOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3MTQsI
        mV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJpc3MiOiJ0Z
        WFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU`;
        
      try {
          await getJobRoles(JWTTOKEN);
      } catch (e) {
        expect(e.message).to.equal('Failed to get Job Roles');
        return;
      }
    })
  })
})

