import { Redis } from 'ioredis'

export const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null
})

//connection config object — used by Queue and Worker
export const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
}
redisClient.on("connect", () => console.log("Redis connected successfully"))
redisClient.on("error", (e) => console.error("Redis error:", e.message))
