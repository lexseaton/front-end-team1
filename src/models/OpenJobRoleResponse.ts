import { Locations } from "./Locations"

export type OpenJobRoleResponse = {
    jobRoleID: Number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: string,
    jobRoleBand: string,
    jobRoleClosingDate: Date
}