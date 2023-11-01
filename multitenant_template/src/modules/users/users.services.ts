import { InferModel, eq } from "drizzle-orm";
import { application, userToRoles, users } from "../../db/schema";
import { db } from "../../db";
import argon2 from 'argon2';

export async function createUser(data: InferModel<typeof users, 'insert'>)
{
    const hashedPassword = await argon2.hash(data.password)
    const result = await db.insert(users).values({
        ...data,
        password: hashedPassword
    }).returning({
        id: users.id,
        email: users.email,
        name: users.name,
        applicationId: application.id
    })

    return result[0]
}

export async function getUserByApplication(applicationId: string)
{
    const result = await db.select()
    .from(users).where(eq(users.applicationId, applicationId))
    
    return result
}

export async function assignRoleToUser(data: InferModel<typeof userToRoles, 'insert'>)
{
    const result = await db.insert(userToRoles)
    .values(data).returning()

    return result[0]
}