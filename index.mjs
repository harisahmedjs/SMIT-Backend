import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
const PORT = 3001;

dotenv.config()

app.get('/', (req, res) => {
  res.send('hello world')
});

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log('DATABASE CONNECTED');
    } catch (error) {
      console.error(error);
    }
  }
  
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  }).catch((err) => {
    console.error(err);
  }); 
