import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB(); // Connect to mongodb

const port = process.env.PORT || 5000;

const app = express();

//Body Parser midddleware (Here this line of code is used for getting data for authUser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Api is running...')
});

app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
  );

  const __dirname = path.resolve(); //Set __dirname to current directory
  app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`server is running on port ${port}`))