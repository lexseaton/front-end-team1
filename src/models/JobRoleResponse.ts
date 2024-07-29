import { Locations } from "./Locations"

export type JobRoleResponse = {
    jobRoleID: Number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: string,
    jobRoleBand: string,
    jobRoleClosingDate: Date
    jobRoleSpecUrl: string,
    jobRoleResponsibilities: string,
    jobRoleDescription: string
}