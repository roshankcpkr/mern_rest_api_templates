import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const createUserBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    applicationId: z.string().uuid(),
    password: z.string().min(8).max(30),
    initialUser: z.boolean().optional()
})

export type CreateUserBody = z.infer<typeof createUserBodySchema>

export const createUserJsonSchema = {
    body: zodToJsonSchema(
        createUserBodySchema,
        "createUserBodySchema"
    ),
}

//login

const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30),
    applicationId: z.string().uuid()
})

export type LoginBody = z.infer<typeof loginBodySchema>

export const loginJsonSchema = {
    body: zodToJsonSchema(
        loginBodySchema,
        "loginBodySchema"
    ),
}

const assignRoleToUserBody = z.object({
    userId: z.string().uuid(),
    roleId: z.string().uuid(),
    // applicationId: z.string().uuid()
})

export type AssignRoleToUserBody = z.infer<typeof assignRoleToUserBody>

export const assignRoleToUserJsonSchema = {
    body: zodToJsonSchema(
        assignRoleToUserBody,
        "assignRoleToUserBody"
    )
}

