import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import sinon from 'sinon';
import { describe, it } from "node:test";
import { Band } from "../../../src/models/Band";
import { Locations } from "../../../src/models/Locations";
import { Capability } from "../../../src/models/Capability";

const dt = new Date(2024, 11, 29);

const jobRoleResponse: JobRoleResponse = {
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: Capability.Delivery,
  jobRoleBand: Band.BAND1,
  jobRoleClosingDate: dt
}

describe('JobRoleController', function () {
describe('getAllJobRoles', function () {
  it('should render view with job roles when job roles returned', async () => {
    
    const jobRoleList = [jobRoleResponse];

    // Stub the JobRoleService.getJobRoles method
    const stub = sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

    // Mock req and res objects
    const req = {};
    const res = { render: sinon.spy() };

    // Call the controller method
    await JobRoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Assertions
    expect(res.render.calledOnce).to.be.true;
    expect(res.render.calledWith('jobRoleList.html', { jobRoles: jobRoleList })).to.be.true;

    // Restore the stub
    stub.restore();

  });
});
})
