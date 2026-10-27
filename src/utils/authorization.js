import { AppError } from "../middleware/appError.js";
import jwt from 'jsonwebtoken'
import { userModel } from "../models/user.js";
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;


export const authorization = async (req, res, next) => {
    let bearerToken = req.headers.authorization;
    // console.log(req.headers.authorization)
    if (!bearerToken) {
        throw new AppError('token not found login first', 403)
    }
    let token = bearerToken.split(" ")[1]; // tell front about it bearer token
    if (!token) {
        throw new AppError('invalid token', 400)
    }
    let decode = await jwt.decode(token, PRIVATE_KEY);
    if (!decode) {
        throw new AppError('can not decoded this token, invalid token', 400)
    }
    let user = await userModel.findById(decode.id);
    console.log(decode);
    req.role = user.role,
    req.userId = decode.id
    next();
}