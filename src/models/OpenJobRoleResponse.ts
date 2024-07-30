import { Locations } from "./Locations"

export type OpenJobRoleResponse = {
    jobRoleID: number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: string,
    jobRoleBand: string,
    jobRoleClosingDate: Date
}