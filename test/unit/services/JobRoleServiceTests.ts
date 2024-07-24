import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoles, URL } from '../../../src/services/JobRoleService';
import { OpenJobRoleResponse } from "../../../src/models/OpenJobRoleResponse";
import { Locations } from "../../../src/models/Locations";

const dt = new Date(1721718000000);

const openJobRoleResponse: OpenJobRoleResponse = {
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: "HR",
  jobRoleBand: "BAND1",
  jobRoleClosingDate: dt
}
const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
describe('getJobRoles', function () {
  it('should return job roles from response', async () => {
      const data = [openJobRoleResponse];

       mock.onGet("http://localhost:8080/api/openJobRoles").reply(200, data);
  try {
      const results = await getJobRoles();
      console.log('Results:', results);
      console.log('Expected:', openJobRoleResponse);  

      expect(results[0]).to.deep.equal(openJobRoleResponse);
  } catch (error) {
    console.error('Test failed', error);
  }
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

