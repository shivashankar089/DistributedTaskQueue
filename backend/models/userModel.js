import {Schema,model} from 'mongoose'

const userSchema = new Schema({
    firstname:{
        type:String,
        required:[true,"First Name is required"]
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Email is mandatory"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"]
    },
    mobile:{
        type:String,
        required:[true,"Mobile is mandatory"]
    },
    isUserActive:{
        type:Boolean,
        default:true
    }
},
{
timestamps:true,
versionKey:false,
strict:"throw"
})


export const userModel = model("duser",userSchema);