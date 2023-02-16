const joi = require('joi');
const joiObjectId = require('joi-objectid')(joi)

//register
export const registerSchema = joi.object({
    firstname: joi.string().min(3).max(30).required(),
    lastname: joi.string().min(1).max(30).required(),
    email: joi.string().max(100).required(),
    mobile: joi.string().min(10),
    password: joi.string().min(6).max(30),
    role: joi.string().required().valid('CLIENT', 'FREELANCER', 'ADMIN'),
})
export const loginSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().min(6).max(30).required(),
})
export const forgotPasswordSchema = joi.object({
    email: joi.string().required(),
})
export const changePasswordSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).max(30).required(),
    confirmPassword: joi.any().valid(joi.ref('password'))
})