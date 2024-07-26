import { Locations } from "./Locations"

export type OpenJobRoleResponse = {
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: string,
    jobRoleBand: string,
    jobRoleClosingDate: Date
}