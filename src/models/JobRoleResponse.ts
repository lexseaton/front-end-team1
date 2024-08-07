import { Locations } from "./Locations"
import { Capabilities } from "./Capabilities"

export type JobRoleResponse = {
    jobRoleID: number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: Capabilities,
    jobRoleBand: string,
    jobRoleClosingDate: Date
}