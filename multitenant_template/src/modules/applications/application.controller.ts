import { FastifyReply, FastifyRequest } from "fastify";
import { CreateApplicationBody } from "./application.schemas";
import { createApplication, getApplications } from "./application.services";
import { createRole } from "../roles/roles.services";
import { ALL_PERMISSIONS, SYSTEM_ROLE, USER_ROLE_PERMISSION } from "../../config/permissions";

export async function createApplicationHandler(request:FastifyRequest<{
    Body: CreateApplicationBody
}>, reply:FastifyReply)
{
    const { name } = request.body

    const application = await createApplication({name})

    const superAdminRolePromise = createRole({
        applicationId: application.id,
        name: SYSTEM_ROLE.SUPER_ADMIN,
        permissions: ALL_PERMISSIONS as unknown as string[]
    })

    const applicationUserRolePromise = createRole({
        applicationId: application.id,
        name: SYSTEM_ROLE.APPLICATION_USER,
        permissions: USER_ROLE_PERMISSION
    })
    const [superAdminRole, applicationUserRole] = await Promise.allSettled([
        superAdminRolePromise,
        applicationUserRolePromise
    ])

    if(superAdminRole.status === 'rejected')
    {   
        throw new Error("Error creating super admin roles")
    }

    if(applicationUserRole.status === 'rejected')
    {
        throw new Error("Error creating applicaiton roles")
    }
    return {
        application,
        superAdminRole: superAdminRole.value,
        applicationUserRole: applicationUserRole.value
    }
}

export async function getApplicationsHandler()
{
    return getApplications()
}