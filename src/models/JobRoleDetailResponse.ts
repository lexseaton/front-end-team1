import { JobRoleSpecification } from "./JobRoleSpecification"
import { Locations } from "./Locations"

export type JobRoleDetailResponse = {
    jobRoleID: number,
    jobRoleName: string,
    jobRoleLocation: Locations,
    jobRoleCapability: string,
    jobRoleBand: string,
    jobRoleClosingDate: Date
    jobRoleSpecification: JobRoleSpecification
}