import express from 'express'
import mongoose from "mongoose";
import {port}   from './config/environment.mjs';
import usersRouter from './routes/users.mjs'
const app = express();

app.use(express.json());


app.use('/api/users' , usersRouter)





const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log('DATABASE CONNECTED');
    } catch (error) {
      console.error(error);
    }
  }
  
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }).catch((err) => {
    console.error(err);
  }); 

 
