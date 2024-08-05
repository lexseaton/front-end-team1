import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getSingleJobRole, getJobRoles, URL } from '../../../src/services/JobRoleService';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { Locations } from "../../../src/models/Locations";
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";
import { JobRoleSpecification } from "../../../src/models/JobRoleSpecification";

const dt = new Date(2024, 11, 29);

const jobRoleSpecification: JobRoleSpecification = {
  jobRoleSpecUrl: "https://kainos.wd3.myworkdayjobs.com/en-US/Kainos/details/Product-Manager_JR_14352",
  jobRoleResponsibilities: "test responsibilities for pm",
  jobRoleDescription: "test description for PM job role"
}

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
  jobRoleSpecification: jobRoleSpecification,
  numOpenPos: 0
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

  describe('getJobRoleById', function () {
    it('should return single job role from response', async () => {
        const data = [jobRoleResponse];
        mock.onGet(URL + "1").reply(200, data);
        const results = await getSingleJobRole("1");
        expect(results[0].jobRoleClosingDate).to.deep.equal(jobRoleResponse.jobRoleClosingDate.toISOString());
        expect(results[0].jobRoleBand).to.deep.equal(jobRoleResponse.jobRoleBand);
        expect(results[0].jobRoleLocation).to.deep.equal(jobRoleResponse.jobRoleLocation);
        expect(results[0].jobRoleName).to.deep.equal(jobRoleResponse.jobRoleName);
        expect(results[0].jobRoleCapability).to.deep.equal(jobRoleResponse.jobRoleCapability);
        expect(results[0].jobRoleSpecification).to.deep.equal(jobRoleResponse.jobRoleSpecification);
      })

    it('should throw Failed to get Job Role error when 500 error returned from axios', async () => {
      mock.onGet(URL + "1").reply(500);

      try {
        await getSingleJobRole("1");
      } catch (e) {
        expect(e.message).to.equal('Failed to get Job Role');
        return;
      }
    })

    it('should throw Does Not Exist error when 404 error returned from axios', async () => {
      mock.onGet(URL + "2000").reply(404);

      try {
        await getSingleJobRole("2000");
      } catch (e) {
        expect(e.message).to.equal('Job Role Does Not Exist');
        return;
      }
    })
  })
})