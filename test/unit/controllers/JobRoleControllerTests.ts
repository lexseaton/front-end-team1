import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";
import sinon from 'sinon';
import { describe, it } from "node:test";
import { Locations } from "../../../src/models/Locations";
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
  numOpenPos: 0
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

describe('JobRoleController', function () {
  afterEach(() => {
    sinon.restore();
});

describe('getAllJobRoles', function () {
  it('should render view with job roles when job roles returned', async () => {
    
    const jobRoleList = [openJobRoleResponse];

    const stub = sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

    const req = {};
    const res = { render: sinon.spy() };

    await JobRoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(res.render.calledOnce).to.be.true;
    expect(res.render.calledWith('openJobRoleList.html', { openJobRoles: jobRoleList })).to.be.true;

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

    stub.restore();
  });
});

describe('getSingleJobRole', function () {
  it('should render view with job role details when job role returned', async () => {
    const jobRoleDetails = [jobRoleResponse];
    const stub = sinon.stub(JobRoleService, 'getSingleJobRole').resolves(jobRoleDetails);

    const req = { params: { id: '1' } };
    const res = { render: sinon.spy(), locals: {} };

    await JobRoleController.getJobRoleById(req as any, res as any);  // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(res.render.calledOnce).to.be.true;
    expect(res.render.calledWith('openJobRoleDetail.html', { openJobRole: jobRoleDetails })).to.be.true;

    stub.restore();
  });


it('should render view with error message when error thrown', async () => {
  const errorMessage: string = 'Failed to get Job Role';

  const stub = sinon.stub(JobRoleService, 'getSingleJobRole').rejects(new Error(errorMessage));

  const req = { params: { id: '100' } };
  const res = { render: sinon.spy(), locals: { errormessage: '' } };

  await JobRoleController.getJobRoleById(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  expect(res.render.calledOnce).to.be.true;
  expect(res.render.calledWith('openJobRoleDetail.html')).to.be.true;
  expect(res.locals.errormessage).to.equal(errorMessage);

  stub.restore();
});

})
})
