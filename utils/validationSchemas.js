const Joi = require("joi");

// Define the schema for product validation
const productSchema = Joi.object({
    brand: Joi.string().required().messages({
        'string.empty': 'Brand is required.',
    }),
    model: Joi.string().required().messages({
        'string.empty': 'Model is required.',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number.',
        'number.positive': 'Price must be a positive number.',
        'any.required': 'Price is required.',
    }),
});

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
        'number.base': 'Rating phải là một số.',
        'number.min': 'Rating không được nhỏ hơn 1.',
        'number.max': 'Rating không được lớn hơn 5.',
        'any.required': 'Rating là bắt buộc.',
    }),
    comment: Joi.string().optional().allow('').messages({
        'string.base': 'Comment phải là một chuỗi.',
    })
});

module.exports = {
    productSchema,
    reviewSchema,
};
