import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "duser",
            required: [true, "User Id is mandatory"],
            index: true
        },
        type: {
            type: String,
            enum: ["number", "email", "notification","message"],
            required: [true, "Task type is mandatory"]
        },
        payload: {
            type: Schema.Types.Mixed
        },
        status: {
            type: String,
            enum: ["pending", "processing", "completed", "failed"],
            default: "pending",
            index: true
        },
        retries: {
            type: Number,
            default: 0
        },
        maxRetries: {
            type: Number,
            default: 3
        },
        result: {
            type: Schema.Types.Mixed
        },
        error: {
            type: Schema.Types.Mixed
        },
        from:{
            type:String
        },
        to:{
            type:String
        },
        message:{
            type:String
        },
        processedAt: {
            type: Date
        },
        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true,
        versionKey: false,
        strict: "throw"
    }
)

export const taskModel = model("dtask", taskSchema)