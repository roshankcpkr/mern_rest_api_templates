import { buildServer } from "./utils/server"


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
        port : 3000,
    })

    const signals = ['SIGINT', 'SIGTERM'] as const

    for (const signal of signals)
    {
        process.on(signal, async () => {
            console.log(`Received ${signal}. Shutting down gracefully.`)
            await gracefulShutdown({app})
        })
    }
}

main()