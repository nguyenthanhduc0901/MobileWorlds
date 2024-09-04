// controllers/reviews.js
var Review = require("../models/review");
var Product = require("../models/product");
var ExpressError = require("../utils/ExpressError");

module.exports.createReview = async (req, res) => {
  const id = req.params.id; 
  const product = await Product.findById(id);
  if (!product) throw new ExpressError("Product Not Found", 404);
  const review = new Review(req.body.review); 
  review.author = req.user._id;
  await review.save();
  product.reviews.push(review._id);
  await product.save();
  req.flash("success", "Đánh giá đã được thêm");
  res.redirect(`/products/${product._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params; 
  console.log('Request URL:', req.originalUrl); 
  console.log('Product ID:', id); 
  console.log('Review ID:', reviewId);

  const product = await Product.findById(id);
  if (!product) throw new ExpressError("Product Not Found", 404);

  product.reviews.pull(reviewId);
  await product.save();

  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Đánh giá đã được xóa");
  res.redirect(`/products/${product._id}`);
};
