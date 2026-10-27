import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getUser, getUserById, sigIn, signUp } from "./user.service.js";
import { validator } from "../../validators/globalValidator.js";
import { userLoginSchema, userSignUpSchema } from "../../validators/user.js";
import { authorization } from "../../utils/authorization.js";


export const userRoutes = Router();
// req front post man move from middleware to next middleware
/// joi                         end point logic ===> save database
///           req data     req data req.role='admin'             req data console.log(req.role)
userRoutes.post("/user", validator(userSignUpSchema), asyncHandler(signUp));
userRoutes.post("/login", validator(userLoginSchema), asyncHandler(sigIn));

//  user ===> login , in every end point take token that already given in login , get user get room add gust
// token  ===> header  ==> authenticate    verify ====> authorization
userRoutes.get("/user",authorization, asyncHandler(getUser))
userRoutes.get("/user/:id",authorization, asyncHandler(getUserById))