import fastify from 'fastify';
import { logger } from './logger';
import { applicationRoutes } from '../modules/applications/application.routes';


export async function buildServer()
{
    const app = fastify({logger});

    //register plugins
    //register routes

    app.register(applicationRoutes, {prefix: '/api/applications'})
    return app
}