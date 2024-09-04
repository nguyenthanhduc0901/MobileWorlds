// models/product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const productSchema = new Schema({
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
  specifications: {
    screenSize: {
      type: String,
    },
    batteryCapacity: {
      type: String,
    },
    camera: {
      type: String,
    },
    processor: {
      type: String,
    },
    storage: {
      type: String,
    },
    ram: {
      type: String,
    },
    operatingSystem: {
      type: String,
    },
  },
  images: [ImageSchema],
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

// Middleware để xóa các đánh giá khi xóa sản phẩm
productSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ _id: { $in: this.reviews } });
  next();
});

module.exports = mongoose.model('Product', productSchema);
