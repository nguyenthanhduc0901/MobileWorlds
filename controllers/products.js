var Product = require("../models/product");
var Review = require("../models/review");
var ExpressError = require("../utils/ExpressError");
const { buildProductFilter } = require("../utils/searchFilters");
const { cloudinary } = require("../cloudinary");
const { paginate } = require("../utils/pagination");

module.exports.index = async (req, res) => {
  const filter = buildProductFilter(req.query);
  const { limit, skip, page } = paginate(req.query);
  const products = await Product.find(filter).limit(limit).skip(skip);
  const totalProducts = await Product.countDocuments(filter);
  res.render("products/index", { 
    products, 
    currentPage: page, 
    totalPages: Math.ceil(totalProducts / limit) 
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("products/new");
};

module.exports.createProduct = async (req, res, next) => {
  const product = new Product(req.body.product);
  product.author = req.user._id;
  product.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  await product.save();
  req.flash("success", "Successfully made a new product!");
  res.redirect(`/products/${product._id}`);
};

module.exports.showProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!product) {
    req.flash("error", "Product Not Found");
    return res.redirect("/products");
  }
  res.render("products/show", { product });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) throw new ExpressError("Product Not Found", 404);
  res.render("products/edit", { product });
};

module.exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const deleteImages = Array.isArray(req.body.deleteImages) ? req.body.deleteImages : [];
  const product = await Product.findByIdAndUpdate(id, { ...req.body.product }, { new: true });
  if (!product) throw new ExpressError("Product Not Found", 404);
  if (deleteImages.length > 0) {
    for (let filename of deleteImages) {
      await cloudinary.uploader.destroy(filename);
      product.images = product.images.filter(img => img.filename !== filename);
    }
  }
  if (req.files && req.files.length > 0) {
    const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    product.images.push(...imgs);
  }
  await product.save();
  req.flash("success", "Successfully updated product!");
  res.redirect(`/products/${product._id}`);
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) throw new ExpressError("Product Not Found", 404);
  if (product.images && product.images.length) {
    for (let img of product.images) {
      await cloudinary.uploader.destroy(img.filename);
    }
  }
  await Product.deleteOne({ _id: id });
  await Review.deleteMany({ _id: { $in: product.reviews } });
  req.flash("success", "Successfully deleted product!");
  res.redirect("/products");
};
