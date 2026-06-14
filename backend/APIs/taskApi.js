import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { taskModel } from '../models/taskModel.js'
import { taskQueue } from '../queues/taskQueue.js'
import { userModel } from '../models/userModel.js'
import multer from 'multer'

export const taskApp = exp.Router()
const upload = multer();


taskApp.post('/number', verifyToken(), upload.none(), async (req, res) => {

    try {
        const { number } = req.body

        // validation
        if (isNaN(number)) {
            return res.status(400).json({
                message: "Valid number required"
            })
        }

        // 1. Create document
        const taskDoc = new taskModel({
            user: req.user.id,
            type: "number",
            payload: { number },
            status: "pending"
        })

        // 2. Save to MongoDB
        const task = await taskDoc.save()

        // 3. Push task to Redis queue
        await taskQueue.add("number-task", {
            taskId: task._id
        })

        // 4. Wait for worker to complete (polling)
        while (true) {
            const updatedTask = await taskModel.findById(task._id).lean()
            
            if (updatedTask.status === "completed") {
                return res.status(201).json({
                    message: "Task completed successfully",
                    taskId: updatedTask._id,
                    input: updatedTask.payload.number,
                    result: updatedTask.result
                })
            }

            if (updatedTask.status === "failed") {
                return res.status(500).json({
                    message: "Task failed",
                    error: updatedTask.error
                })
            }

            await new Promise(r => setTimeout(r, 500))
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error processing task",
            error: error.message
        })
    }
})

//route for sending message

taskApp.post('/message',verifyToken(),upload.none(),async(req,res)=>{
    try{
    const {message} = req.body;
    const userObjId = req.user?.id;
    if(message==""){
        return res.status(400).json({message:"Enter a message..."});
    }
    const taskDoc = new taskModel({
       user: req.user.id,
        type: "message",
        payload: { message },
        status: "pending" 
    });

    await taskDoc.save();
    //push the task to redis queue
    await taskQueue.add("message-task",{
        taskId : taskDoc._id
    })

    //send response
     while (true) {

            const updatedTask = await taskModel.findById(taskDoc._id).lean()

            if (updatedTask.status === "completed") {
                return res.status(201).json({
                    message: "Task completed successfully",
                    taskId: updatedTask._id,
                    input: updatedTask.payload.message,
                    result: updatedTask.result
                })
            }

            if (updatedTask.status === "failed") {
                return res.status(500).json({
                    message: "Task failed",
                    error: updatedTask.error
                })
            }

            await new Promise(r => setTimeout(r, 500))
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error processing task",
            error: error.message
        })
    }
})

//route to send email
taskApp.post('/email', verifyToken(),upload.none(), async (req, res) => {

    try {
        const { from, to, message } = req.body;

        const fromUserObj = await userModel.findOne({ email: from });
        const toUserObj = await userModel.findOne({ email: to });

        if (!fromUserObj || !toUserObj) {
            return res.status(400).json({
                message: "Enter valid email"
            });
        }

        // create task
    const task = await taskModel({
        user: req.user.id,
        type: "email",
        payload: {
            from:from,
            to:to,
            message:message
        },
    status: "pending"
});

task.save()

        // add queue
        await taskQueue.add("email-task", {
            taskId: task._id
        });

        // optional polling
        while (true) {

            const updatedTask = await taskModel.findById(task._id).lean();

            if (updatedTask.status === "completed") {

                return res.status(201).json({
    message: "Email sent successfully",
    taskId: updatedTask._id,
    payload: updatedTask.payload
});
            }

            if (updatedTask.status === "failed") {

                return res.status(500).json({
                    message: "Task failed"
                });
            }

            await new Promise(r => setTimeout(r, 500));
        }

    } catch (error) {

        return res.status(500).json({
            message: "Error processing task",
            error: error.message
        });
    }
});


taskApp.post('/notification',verifyToken(),upload.none(),async(req,res)=>{
        const {title,message} = req.body;
        const userId = req.user.id;
        const task = await taskModel({
           user:userId,
           type:"notification",
           payload:{
            title:title,
            message:message
           },
           status:"pending"
        });
    await task.save();
    //add task to queue
   await taskQueue.add("notification-task",{
    taskId:task._id
   });
    //get result
    while(true){
        const updatedTask = await taskModel.findById(task._id).lean();
        if(updatedTask.status=="completed"){
            return res.status(200).json({message:"Notification sent successfully",payload: updatedTask.payload});
        }
        if(updatedTask.status=="failed"){
            return res.status(400).json({message:"Failed to send Notification",payload: updatedTask.payload});
        }
    }

});


//Route to get all tasks
taskApp.get("/all",verifyToken(),async(req,res)=>{
    const userId = req.user.id;
    const tasks = await taskModel.find({user:userId});
    return res.status(200).json({message:"Tasks are : ",payload:tasks});
})