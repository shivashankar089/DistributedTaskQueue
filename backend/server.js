process.env.BULLMQ_FORCE_UNSAFE_REQUIRE = "true"
process.env.NODE_NO_WARNINGS = "1"

import exp from 'express'
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { userApp } from './APIs/userApi.js';
import { taskApp } from './APIs/taskApi.js';
import cookieParser from 'cookie-parser';
import './config/redis.js'
import { taskQueue } from './queues/taskQueue.js';
import './workers/taskWorker.js'
import cors from "cors"
config();
const app = exp();
app.use(exp.json());
app.use(cors({
  origin: ["http://localhost:5173",
           "https://distributedtaskqueue-xi.vercel.app/"],
  credentials: true
}))
app.use(cookieParser())
app.use('/user',userApp);
app.use('/task',taskApp);
async function Server(){
try{
  //console.log(process.env.DB_URL);
 const res = await connect(process.env.DB_URL);
 console.log("DB connected Successfully");
 const port = process.env.PORT;
app.listen(port,()=>console.log("App is listening to port 4000..."))
}catch(e){
    console.log(e);
}
}

Server();
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Distributed Task Queue Backend is Running"
    });
});