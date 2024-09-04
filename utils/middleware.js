// utils/validateProduct.js
const { productSchema, reviewSchema} = require('./validationSchemas');
const ExpressError = require('./ExpressError');
const Product = require('../models/product');
const Review = require('../models/review');

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body.product, { abortEarly: false });
  
  if (error) {
    const errorMessages = error.details.map(err => err.message).join(', ');
    next(new ExpressError('Invalid product data', 400, { error: errorMessages }));
  } else {
    next();
  }
};


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body.review, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message).join(', ');
        next(new ExpressError('Invalid review data', 400, { error: errorMessages }));
    } else {
        next();
    }
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/products/${id}`);
  }
  next();
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "Bạn cần phải đăng nhập trước.");
        return res.redirect("/login");
    }
    next();
};

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "Bạn không có quyền thực hiện hành động này.");
        return res.redirect(`/products/${id}`);
    }
    next();
}

// Export các hàm
module.exports = {
  validateProduct,
  validateReview,
  isAuthor,
  isReviewAuthor,
  isLoggedIn
};
