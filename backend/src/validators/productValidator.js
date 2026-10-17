const Joi = require('joi');

const createProductSchema = Joi.object({
  categoryId: Joi.string().required(),
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow('').max(500).default(''),
  imageUrl: Joi.string().uri().allow('').default(''),
  price: Joi.number().min(0).allow(null).default(null),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        price: Joi.number().min(0).required(),
      })
    )
    .default([]),
  addOns: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        isActive: Joi.boolean().default(true),
      })
    )
    .default([]),
  isAvailable: Joi.boolean().default(true),
  isFeatured: Joi.boolean().default(false),
  sortOrder: Joi.number().default(0),
});

const updateProductSchema = createProductSchema.fork(
  ['categoryId', 'name'],
  (schema) => schema.optional()
);

module.exports = { createProductSchema, updateProductSchema };
