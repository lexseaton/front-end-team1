import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getSingleJobRole, getJobRoles, URL, countJobRoleName, countTotalJobs, countFilterTotalJobs, countFilterCapTotalJobs } from '../../../src/services/JobRoleService';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { Locations } from "../../../src/models/Locations";
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";
import { JobRoleSpecification } from "../../../src/models/JobRoleSpecification";
import { Capabilities } from "../../../src/models/Capabilities";

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
  jobRoleCapability: Capabilities.Hr,
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
}

const openJobRoleResponse2: JobRoleResponse = {
  jobRoleID: 1,
  jobRoleName: "technical architect",
  jobRoleLocation: Locations.Gdansk,
  jobRoleCapability: Capabilities.Delivery,
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
}

const openJobRoleResponse3: JobRoleResponse = {
  jobRoleID: 1,
  jobRoleName: "technical architect",
  jobRoleLocation: Locations.Gdansk,
  jobRoleCapability: Capabilities.Delivery,
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
}

const jobRoleResponse: JobRoleDetailResponse = {
  jobRoleID: 1,
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: Capabilities.Hr,
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
  jobRoleSpecification: jobRoleSpecification
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

  describe('getSingleJobRole', function () {
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

  describe('countJobRoleName', function () {
    it('should return most frequent job role name from response', async () => {
      const data = [openJobRoleResponse, openJobRoleResponse2, openJobRoleResponse3];
        mock.onGet(URL).reply(200, data);
        const results = await countJobRoleName();

        expect(results).to.equal("technical architect");
        
      })

      it('should return error message from response', async () => {
          mock.onGet(URL).reply(500);
          try {
          await countJobRoleName();
          } catch (e) {
            expect(e.message).to.equal('Failed to determine most in demand job role');
            return;
          }
        })
  })

  describe('countTotalJobs', function () {
    it('should return total number of job roles from response', async () => {
      const data = [openJobRoleResponse, openJobRoleResponse2, openJobRoleResponse3];
        mock.onGet(URL).reply(200, data);
        const results = await countTotalJobs();

        expect(results).to.equal(3);
        
      })

      it('should return error message from response', async () => {
        mock.onGet(URL).reply(500);
        try {
        await countTotalJobs();
        } catch (e) {
          expect(e.message).to.equal('Failed to count total jobs');
          return;
        }
      })
  })

  describe('countFilterTotalJobs', function () {
    it('should return number of job roles for chosen location from response', async () => {
      const data = [openJobRoleResponse, openJobRoleResponse2, openJobRoleResponse3];
        mock.onGet(URL).reply(200, data);
        const results = await countFilterTotalJobs(Locations.Gdansk);

        expect(results).to.equal(2);
        
      })

      it('should return error message from response', async () => {
        mock.onGet(URL).reply(500);
        try {
        await countFilterTotalJobs(Locations.Gdansk);
        } catch (e) {
          expect(e.message).to.equal('Failed to count total jobs');
          return;
        }
      })
  })

  describe('countFilterCapTotalJobs', function () {
    it('should return number of job roles for chosen capability from response', async () => {
      const data = [openJobRoleResponse, openJobRoleResponse2, openJobRoleResponse3];
        mock.onGet(URL).reply(200, data);
        const results = await countFilterCapTotalJobs(Capabilities.Delivery);

        expect(results).to.equal(2);
        
      })

      it('should return error message from response', async () => {
        mock.onGet(URL).reply(500);
        try {
        await countFilterCapTotalJobs(Capabilities.Delivery);
        } catch (e) {
          expect(e.message).to.equal('Failed to count total jobs');
          return;
        }
      })
  })
})