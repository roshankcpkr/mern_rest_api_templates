import { FastifyInstance } from "fastify";
import { createUserHandler, loginHander } from "./users.controller";
import { createUserJsonSchema, loginJsonSchema } from "./users.schemas";

export async function usersRoutes(app:FastifyInstance)
{
    app.post('/', {
        schema: createUserJsonSchema
    }, createUserHandler)

    app.post('/login', {
        schema: loginJsonSchema,
    }, loginHander)
}