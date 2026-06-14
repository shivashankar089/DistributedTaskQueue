import { Queue } from 'bullmq'
import { connection } from '../config/redis.js'

export const taskQueue = new Queue("task-queue", {
    connection,

    defaultJobOptions: {
        attempts: 3,          // retry 3 times if failure
        backoff: {
            type: "exponential",
            delay: 2000       // retry delay: 2s → 4s → 8s
        }
    }
})


taskQueue.on("error", (err) => {
    console.log("Queue error:", err.message)
})