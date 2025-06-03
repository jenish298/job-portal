import mongoose from "mongoose";

//function to coonect to the mpongodb databse

const connectDB = async () => {
  mongoose.connection.on('connected',()=> console.log('database connect'))
  await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB;