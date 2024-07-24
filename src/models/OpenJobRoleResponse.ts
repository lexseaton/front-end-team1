import { Band } from "./Band"
import { Capability } from "./Capability"
import { Locations } from "./Locations"

export type OpenJobRoleResponse = {
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: Capability,
    jobRoleBand: Band,
    jobRoleClosingDate: Date
}