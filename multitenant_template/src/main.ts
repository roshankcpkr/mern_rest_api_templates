import {migrate} from "drizzle-orm/node-postgres/migrator"
import { env } from "./config/env"
import { buildServer } from "./utils/server"
import { logger } from "./utils/logger"
import { db } from "./db"

async function gracefulShutdown({app}: {
    app: Awaited<ReturnType<typeof buildServer>>
})
{
    await app.close()
}

async function main()
{
    const app = await buildServer()
    app.listen({
        port : env.PORT,
        host : env.HOST
    })

    await migrate(db, {
        migrationsFolder: "./migrations",
    })
    const signals = ['SIGINT', 'SIGTERM'] as const
    logger.debug(env, "Environment variables")
    for (const signal of signals)
    {
        process.on(signal, async () => {
            console.log(`Received ${signal}. Shutting down gracefully.`)
            await gracefulShutdown({app})
        })
    }
}

main()