import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from './logger';
import { applicationRoutes } from '../modules/applications/application.routes';
import { usersRoutes } from '../modules/users/users.routes';
import { roleRoutes } from '../modules/roles/role.routes';
import guard from 'fastify-guard';
import jwt from 'jsonwebtoken';

type User = {
    id: string,
    applicationId: string,
    scopes: Array<string>,
}

declare module 'fastify' {
    interface FastifyRequest {
        user: User
    }
}

export async function buildServer() {
    const app = fastify({ logger });

    app.decorateRequest('user', null)
    app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        const authHeader = request.headers.authorization

        if (!authHeader) {
            return
        }

        try {
            const token = authHeader.replace('Bearer ', '')
            const decoded = jwt.verify(token, "SECRETKEY") as User

            request.user = decoded
        }
        catch (error) {

        }
    })
    //register plugins
    app.register(guard, {
        requestProperty: 'user',
        scopeProperty: 'scopes',
        errorHandler: (error, request, reply) => {
            reply.status(403).send("go away")
        }

    })

    //register routes

    app.register(applicationRoutes, { prefix: '/api/applications' })
    app.register(usersRoutes, { prefix: '/api/users' })
    app.register(roleRoutes, { prefix: '/api/roles' })

    return app
}