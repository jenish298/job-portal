import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type : String, required :true},
    name:{type:string ,required: true },
    email:{type:string ,required: true,unique:true },
    resume:{type:string ,required: true },
    image:{type:string ,required: true }
})

const User = mongoose.model('User',userSchema)

export default User;

