import mongoose,{Schema} from 'mongoose'

// Define the schema for the products collection
const productSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  }, 
  image:{
    type:String,

  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
 const Product = mongoose.model('Product', productSchema);
 
 export default Product