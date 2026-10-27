import Joi from "joi";
import { userRole } from "../models/user.js";

export const userSignUpSchema = Joi.object({
    name:Joi.string().min(3).message('min 3 char').max(80).required(),
    email:Joi.string(), 
    password:Joi.string(),
    role:Joi.string().valid(...userRole),
    isActive:Joi.boolean(),
})

export const userLoginSchema = Joi.object({
    password:Joi.string().required(),
    email:Joi.string().email().required()
})