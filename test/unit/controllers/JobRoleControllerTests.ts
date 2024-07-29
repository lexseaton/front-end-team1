import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from 'chai';
import { OpenJobRoleResponse } from "../../../src/models/OpenJobRoleResponse";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import sinon from 'sinon';
import { describe, it } from "node:test";
import { Locations } from "../../../src/models/Locations";

const dt = new Date(2024, 11, 29);

const openJobRoleResponse: OpenJobRoleResponse = {
  jobRoleID: 1,
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: "HR",
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
}

const jobRoleResponse: JobRoleResponse = {
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: "HR",
  jobRoleBand: "trainee",
  jobRoleClosingDate: dt,
  jobRoleSpecUrl: "https://kainos.wd3.myworkdayjobs.com/en-US/Kainos/details",
  jobRoleResponsibilities: "responsibilities",
  jobRoleDescription: "desc"
}

describe('JobRoleController', function () {
  afterEach(() => {
    sinon.restore();
});

describe('getAllJobRoles', function () {
  it('should render view with job roles when job roles returned', async () => {
    
    const jobRoleList = [openJobRoleResponse];

    // Stub the JobRoleService.getJobRoles method
    const stub = sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

    // Mock req and res objects
    const req = {};
    const res = { render: sinon.spy() };

    // Call the controller method
    await JobRoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Assertions
    expect(res.render.calledOnce).to.be.true;
    expect(res.render.calledWith('openJobRoleList.html', { openJobRoles: jobRoleList })).to.be.true;

    
    // Restore the stub
    stub.restore();

  });


  it('should render view with error message when error thrown', async () => {
    const errorMessage: string = 'Failed to get Job Roles';

    const stub = sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

    const req = { };
    const res = { render: sinon.spy(), locals: { errormessage: '' } };

    await JobRoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.calledWith('openJobRoleList.html')).to.be.true;
    expect(res.locals.errormessage).to.equal(errorMessage);

    // Restore the stub
    stub.restore();
  });

  it('should render view with job role details when job role returned', async () => {
    const jobRoleDetails = [jobRoleResponse];

    sinon.stub(JobRoleService, 'getJobRoleById').resolves(jobRoleDetails);

    const req = { };
    const res = { render: sinon.spy() };

    await JobRoleController.getSingleJobRole(req as any, res as any);

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.calledWith('openJobRoleDetail.html', { jobRole: jobRoleDetails })).to.be.true;
  });

});
})
