import { Locations } from "./Locations"

export type JobRoleDetailResponse = {
    jobRoleID: number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: string,
    jobRoleBand: string,
    jobRoleClosingDate: Date
    jobRoleSpecUrl: string,
    jobRoleResponsibilities: string,
    jobRoleDescription: string
}