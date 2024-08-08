import sinon from 'sinon';
import { describe, it } from "node:test";
import { expect } from 'chai';

import * as ApplicationsController from '../../../src/controllers/ApplicationsController';
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as AwsUtils from "../../../src/utils/AwsUtils";
import * as ApplicationsService from "../../../src/services/ApplicationsService";
import { JobRoleDetailResponse } from '../../../src/models/JobRoleDetailResponse';
import { Locations } from '../../../src/models/Locations';
import { JobRoleSpecification } from '../../../src/models/JobRoleSpecification';


const JWTTOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjE3NjM3"
+ "MTQsImV4cCI6MTcyMTc5MjUxNCwiUm9sZSI6MSwic3ViIjoiYWRtaW4iLCJ"
+ "pc3MiOiJ0ZWFtMS1hcGkifQ.13PjVdPseFyBE8AQrjHSSM0Spx-1tkYnwHjR5IVITeU";

const file = new File([], "test", {type: "docx"});

const dt = new Date(2024, 11, 29);

const jobRoleSpecification: JobRoleSpecification = {
    jobRoleSpecUrl: "https://kainos.wd3.myworkdayjobs.com/en-US/Kainos/details/Product-Manager_JR_14352",
    jobRoleResponsibilities: "test responsibilities for pm",
    jobRoleDescription: "test description for PM job role"
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

describe("ApplicationsController", () => {
    describe("getApplicationForm", () => {
        after (() => {
            sinon.reset();
        });

        it('should render application form', async () => {
            const jobRoleDetails = [jobRoleResponse];
            const req = { params: { id: '1' }, session: { token: JWTTOKEN } };
            const res = { render: sinon.spy() };
            
            const stub = sinon.stub(JobRoleService, 'getSingleJobRole').resolves(jobRoleDetails);

            await ApplicationsController.getApplicationForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;

            stub.restore();
        });

    });

    describe("uploadCV", () => {
        after (() => {
            sinon.reset();
        });

        it('should let user know there is no file', async () => {
            const req = { params: { id: '1' }, session: { token: JWTTOKEN } };
            const res = { render: sinon.spy(), message: "" };
            
            const stub = sinon.stub(AwsUtils, 'upload').resolves("locationstring");

            await ApplicationsController.uploadCV(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith("apply.html", {message: "No file provided."})).to.be.true;

            stub.restore();
        });

        it('should render the page after successful upload happened successfully', async () => {
            const req = { params: { id: '1' }, file: file, session: { token: JWTTOKEN } };
            const res = { render: sinon.spy(), message: "" };
            
            const stub = sinon.stub(AwsUtils, 'upload').resolves("locationstring");
            const stub2 = sinon.stub(ApplicationsService, 'sendApplication').resolves(true);

            await ApplicationsController.uploadCV(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            
            stub.restore();
            stub2.restore();
        });

        it('should render the page after successful upload happened successfully', async () => {
            const req = { params: { id: '1' }, file: file, session: { token: JWTTOKEN } };
            const res = { render: sinon.spy(), message: "" };
            
            const stub = sinon.stub(AwsUtils, 'upload').resolves("locationstring");
            const stub2 = sinon.stub(ApplicationsService, 'sendApplication').resolves(false);

            await ApplicationsController.uploadCV(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            
            stub.restore();
            stub2.restore();
        });

    });
});