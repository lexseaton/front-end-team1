import * as HomeController from "../../../src/controllers/HomeController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { expect } from 'chai';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";
import sinon from 'sinon';
import { describe, it } from "node:test";
import { Locations } from "../../../src/models/Locations";
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
  jobRoleClosingDate: dt
}

const openJobRoleResponse2: JobRoleResponse = {
    jobRoleID: 1,
    jobRoleName: "technical architect",
    jobRoleLocation: Locations.Gdansk,
    jobRoleCapability: Capabilities.Delivery,
    jobRoleBand: "trainee",
    jobRoleClosingDate: dt
  }


  const openJobRoleResponse3: JobRoleResponse = {
    jobRoleID: 1,
    jobRoleName: "technical architect",
    jobRoleLocation: Locations.Gdansk,
    jobRoleCapability: Capabilities.Delivery,
    jobRoleBand: "trainee",
    jobRoleClosingDate: dt
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

describe('HomeController', function () {

    afterEach(() => {
        sinon.restore();
    });

describe('getTotalNumberOfJobs', function () {
  it('should render view with total number of job roles when job roles returned', async () => {

    const req = { };
    const res = { render: sinon.spy(), locals: { errormessage: '' } };
    const stub = sinon.stub(JobRoleService, 'countTotalJobs');
    const mockTotalJobs = 3;
    stub.resolves(mockTotalJobs);

    const result = await HomeController.getTotalNumberOfJobs(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(result).to.equal(mockTotalJobs);
    expect(stub.calledOnce).to.be.true;
   
    stub.restore();

  });


  it('should render view with error message when error thrown', async () => {
    const req = { };
    const res = { render: sinon.spy(), locals: { errormessage: '' } };
    const stub = sinon.stub(JobRoleService, 'countTotalJobs');
    const mockError = new Error('Failed to count total jobs');
    stub.rejects(mockError);

    try{
    await HomeController.getTotalNumberOfJobs(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    } catch (e) {
        expect(res.locals.errormessage).to.equal(mockError);
    }
    expect(stub.calledOnce).to.be.true;
    stub.restore();
  });
});
})
