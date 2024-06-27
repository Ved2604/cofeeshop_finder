import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import shopRoutes from './routes/shops.routes.js' 
import productRoutes from './routes/product.routes.js' 
import stripeRoutes from './routes/stripe.routes.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use('/api/shops', shopRoutes);
app.use('/api/products', productRoutes);  
app.use('/api/stripe', stripeRoutes);

// MongoDB connection
async function connect() {
  try {
      mongoose.connect(process.env.MONGO_URI);
      const connection = mongoose.connection;

      connection.on('connected', () => {
          console.log('MongoDB connected successfully');
      })

      connection.on('error', (err) => {
          console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
          process.exit();
      })

      

  } catch (error) {
      console.log('Something goes wrong!');
      console.log(error);
      
  }
}
connect()

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
