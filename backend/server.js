import express from 'express';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB(); // Connect to mongodb

const port = process.env.PORT || 5000;

const app = express();

app.get('/',(req,res)=>{
    res.send('Api is running...')
});

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`server is running on port ${port}`))