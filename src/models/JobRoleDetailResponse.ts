import { Capabilities } from "./Capabilities"
import { JobRoleSpecification } from "./JobRoleSpecification"
import { Locations } from "./Locations"

export type JobRoleDetailResponse = {
    jobRoleID: number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: Capabilities,
    jobRoleBand: string,
    jobRoleClosingDate: Date
    jobRoleSpecification: JobRoleSpecification
}