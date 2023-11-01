import { z } from "zod";
import { ALL_PERMISSIONS } from "../../config/permissions";
import zodToJsonSchema from "zod-to-json-schema";

const createRoleBodySchema = z.object({
    name: z.string().min(1).max(255),
    permissions: z.array(z.enum(ALL_PERMISSIONS)),
    // applicationId: z.string().uuid()
})

export type CreateRoleBody = z.infer<typeof createRoleBodySchema>


export const createRoleJsonSchema = {
    body: zodToJsonSchema(createRoleBodySchema,
        "createRoleBodySchema"
    )

}
const updateRoleBodySchema = z.object({
    name: z.string().min(1).max(255),
    permissions: z.array(z.enum(ALL_PERMISSIONS)),
})