import mongoose from "mongoose";

const { schema }  =  mongoose

const userSchema = new schema ({
    Email:{
        type : String,
        required : true
    },
    Password:{
        type : String,
        required : true
    }   
})