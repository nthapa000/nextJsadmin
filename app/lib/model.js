import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
},
{timestamps:true}
// will add createdAt and updatedAt whenever user created
)

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    img:{
        type:String,
    },
    color:{
        type:String,
    },
    size:{
        type:String,
    },
},
{timestamps:true}
// will add createdAt and updatedAt whenever user created
)

export const User = mongoose.models.User || mongoose.model("User",userSchema)
// if user already exist then there is no need to make a new User table
export const Product = mongoose.models.Product || mongoose.model("Product",productSchema)