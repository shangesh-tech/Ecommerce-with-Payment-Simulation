const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"]
  },
  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      image: {
        type: String,
        required: [true, "Please enter image URL"]
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: [
      'Airpodes',
      'Mobile Phones',
      'Laptops',
      'Camera'
    ]
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"]
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    max: [20, 'Product stock cannot exceed 20']
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        required: [true, "Please enter rating"]
      },
      comment: {
        type: String,
        required: [true, "Please enter comment"]
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });



module.exports = mongoose.model('Product', productSchema);
