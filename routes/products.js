var express = require("express");
var router = express.Router();
var catchAsync = require("../utils/catchAsync");
var { isLoggedIn, validateProduct, isAuthor } = require("../utils/middleware");;
var products = require("../controllers/products");

const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route("/")
  .get(catchAsync(products.index))
  .post(isLoggedIn, upload.array('image'), validateProduct, catchAsync(products.createProduct));

router.get("/new", isLoggedIn, products.renderNewForm);

router.route("/:id")
  .get(catchAsync(products.showProduct))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateProduct, catchAsync(products.updateProduct))
  .delete(isLoggedIn, isAuthor, catchAsync(products.deleteProduct));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(products.renderEditForm));

module.exports = router;
