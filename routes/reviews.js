var express = require("express");
var router = express.Router({ mergeParams: true });
var catchAsync = require("../utils/catchAsync");
var { validateReview, isLoggedIn, isReviewAuthor } = require("../utils/middleware");
var reviews = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
