import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, LoginBody } from "./users.schemas";
import { SYSTEM_ROLE } from "../../config/permissions";
import { getRoleByName } from "../roles/roles.services";
import { assignRoleToUser, createUser, getUserByApplication, getUserByEmail } from "./users.services";
import { users } from "../../db/schema";
import Jwt  from "jsonwebtoken";

export async function createUserHandler(request: FastifyRequest<{
    Body: CreateUserBody
}>, reply: FastifyReply)
{
    const {initialUser, ...data} = request.body

    const roleName = initialUser ? SYSTEM_ROLE.SUPER_ADMIN : SYSTEM_ROLE.APPLICATION_USER;

    if(roleName === SYSTEM_ROLE.SUPER_ADMIN)
    {
        const appUsers = await getUserByApplication(data.applicationId)

        if(appUsers.length > 0)
        {
            return reply.code(400).send({
                message: "Application already has a super admin",
                extensions: {
                    code: "APPLICATION_ALREADY_HAS_SUPER_ADMIN",
                    applicationId: data.applicationId
                }
            })
        }
    }
    const role = await getRoleByName({
        name: roleName,
        applicationId: data.applicationId
    })

    if(!role)
    {
        return reply.code(404).send({
            message: "Role not found"
        })
    }

    try
    {
        const user = await createUser(data)

        await assignRoleToUser({
            userId: user.id,
            roleId: role.id,
            applicationId: data.applicationId
        })

        return user
    }
    catch(error)
    {

    }

}


export async function loginHander(request: FastifyRequest<{
    Body: LoginBody
}>, reply: FastifyReply)
{
    const {applicationId, email, password} = request.body
    const user = await getUserByEmail({email, applicationId})

    if(!user)
    {
        return reply.code(404).send({
            message: "User not found"
        })
    }

    const token = Jwt.sign({
        id: user.id,
        scopes: user.permissions,
        applicationId: user.applicationId,
        email,

    }, "SECRETKEY")

    return {
        token
    }

}

