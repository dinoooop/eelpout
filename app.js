import express from "express"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import postRoutes from './src/routes/postRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Could not connect to MongoDB:', error));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)

export default app;