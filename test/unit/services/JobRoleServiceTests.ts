import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoleById, getJobRoles, URL } from '../../../src/services/JobRoleService';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { Locations } from "../../../src/models/Locations";
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";

const dt = new Date(2024, 11, 29);

const openJobRoleResponse: JobRoleResponse = {
  jobRoleID: 1,
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: "HR",
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
}

const jobRoleResponse: JobRoleDetailResponse = {
  jobRoleID: 1,
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: "HR",
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
  jobRoleSpecUrl: "https://kainos.wd3.myworkdayjobs.com/en-US/Kainos/details",
  jobRoleResponsibilities: "responsibilities",
  jobRoleDescription: "desc"
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
describe('getJobRoles', function () {
  it('should return job roles from response', async () => {
      const data = [openJobRoleResponse];

      mock.onGet(URL).reply(200, data);

      const results = await getJobRoles();

      expect(results[0].jobRoleBand).to.deep.equal(openJobRoleResponse.jobRoleBand);
      expect(results[0].jobRoleLocation).to.deep.equal(openJobRoleResponse.jobRoleLocation);
      expect(results[0].jobRoleName).to.deep.equal(openJobRoleResponse.jobRoleName);
      expect(results[0].jobRoleCapability).to.deep.equal(openJobRoleResponse.jobRoleCapability);
      expect(results[0].jobRoleClosingDate).to.deep.equal(openJobRoleResponse.jobRoleClosingDate.toISOString());
    })

  it('should throw exception when 500 error returned from axios', async () => {
      mock.onGet(URL).reply(500);

      try {
          await getJobRoles();
      } catch (e) {
        expect(e.message).to.equal('Failed to get Job Roles');
        return;
      }
    })
  })
})

describe('JobRoleService', function () {
  describe('getJobRoleById', function () {
    it('should return single job role from response', async () => {
        const data = [jobRoleResponse];
        mock.onGet(URL + "1").reply(200, data);
        const results = await getJobRoleById("1");
        console.log('Results:' + results);
        expect(results[0].jobRoleClosingDate).to.deep.equal(jobRoleResponse.jobRoleClosingDate.toISOString());
        expect(results[0].jobRoleBand).to.deep.equal(jobRoleResponse.jobRoleBand);
        expect(results[0].jobRoleLocation).to.deep.equal(jobRoleResponse.jobRoleLocation);
        expect(results[0].jobRoleName).to.deep.equal(jobRoleResponse.jobRoleName);
        expect(results[0].jobRoleCapability).to.deep.equal(jobRoleResponse.jobRoleCapability);
        expect(results[0].jobRoleSpecUrl).to.deep.equal(jobRoleResponse.jobRoleSpecUrl);
        expect(results[0].jobRoleResponsibilities).to.deep.equal(jobRoleResponse.jobRoleResponsibilities);
        expect(results[0].jobRoleDescription).to.deep.equal(jobRoleResponse.jobRoleDescription);
      })

    it('should throw Failed to get Job Role error when 500 error returned from axios', async () => {
      mock.onGet(URL + "1").reply(500);

      try {
        await getJobRoleById("1");
      } catch (e) {
        expect(e.message).to.equal('Failed to get Job Role');
        return;
      }
    })
  })
})