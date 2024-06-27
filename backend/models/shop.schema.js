import mongoose,{Schema} from 'mongoose'



// Define the schema for the shops collection
const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index on the location field
shopSchema.index({ location: '2dsphere' });

// Export the model
const Shop = mongoose.model.Shop||mongoose.model('Shop', shopSchema)

export default Shop