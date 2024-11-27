const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.validateSignup = (data) => signupSchema.validate(data);
exports.validateLogin = (data) => loginSchema.validate(data);
