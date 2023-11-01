import { FastifyInstance } from "fastify";
import { createApplicationHandler, getApplicationsHandler } from "./application.controller";
import { createApplicationJsonSchema } from "./application.schemas";

export async function applicationRoutes(app: FastifyInstance)
{
    app.post('/', {
        schema: createApplicationJsonSchema
    }, createApplicationHandler)

    app.get('/', getApplicationsHandler)
}