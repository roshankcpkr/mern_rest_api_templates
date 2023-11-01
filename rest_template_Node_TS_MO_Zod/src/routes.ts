import { createUserHandler } from "./controller/user.controller"
import { Express, Request, Response } from "express"
import validateResource from "./middleware/validateResource"
import { createUserSchema } from "./schema/user.schema"
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.controller"
import { createSessionSchema } from "./schema/session.schema"
import requireUser from "./middleware/requireUser"

function routes (app: Express)
{
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.sendStatus(200)
    })

    app.post('/api/users', validateResource(createUserSchema), createUserHandler)

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
    app.get('/api/sessions', requireUser, getUserSessionHandler)
    app.delete('/api/sessions', requireUser, deleteSessionHandler)
}

export default routes