import { Worker } from 'bullmq'
import { connection } from '../config/redis.js'
import { taskModel } from '../models/taskModel.js'


//FACTORIAl

function factorial(n) {
    let result = 1

    for (let i = 1; i <= n; i++) {
        result = result * i
    }

    return result
}

//worker
export const taskWorker = new Worker(
    "task-queue",

    async (job) => {

        const { taskId } = job.data
        console.log("Job received:", taskId)

        // 1. Get task from DB
        const task = await taskModel.findById(taskId)

        if (!task) {
            console.log("Task not found")
            return
        }

        // NUMBER TASK
if (task.type === "number") {

    console.log("Processing number:", task.payload.number)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const number = task.payload.number
    const result = factorial(number)

    task.status = "completed"

    task.result = {
        number,
        factorial: result
    }

    await task.save()

    console.log("Number task completed")
}


// MESSAGE TASK
if (task.type === "message") {

    console.log("Processing message:", task.payload.message)

    await new Promise((resolve) => setTimeout(resolve, 3000))
    const message = task.payload.message

    task.status = "completed"

    task.result = {
        originalMessage: message,
        processedMessage: message.toUpperCase()
    }

    await task.save()

    console.log("Message task completed")
}
if(task.type=="email"){
    console.log("Processing email...",task.payload.from);
    await new Promise((resolve)=>setTimeout(resolve,3000));
    const email = task.payload.from;
    task.result = {
        from :task.payload.from,
        to: task.payload.to,
        message:task.payload.message
    }
    task.status = "completed";
    await task.save();
}
if(task.type=="notification"){
    console.log("Processing notification...");
    task.result = {
        title:task.payload.title,
        message:task.payload.message
    }
     task.status = "completed";
     await task.save();
}
    },

    {
        connection,
        concurrency: 5
    }
)

//events
taskWorker.on("completed", (job) => {
    console.log("Job completed:", job.id)
})

taskWorker.on("failed", (job, error) => {
    console.log("Job failed:", job.id, error.message)
})

console.log("Worker is running...");