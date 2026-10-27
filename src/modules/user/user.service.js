import { AppError } from "../../middleware/appError.js";
import { userModel } from "../../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10);
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export const signUp = async (req, res) => {
    let { name, email, password } = req.body;
    console.log(SALT_ROUNDS);
    let hashPass = await bcrypt.hash(password, SALT_ROUNDS);// hash
    let saveUser = await userModel.create({ name, email, password: hashPass })
    res.status(201).json({ message: 'user created successfully', saveUser })
}

export const sigIn = async (req, res) => {
    let { email, password } = req.body;
    let checkUser = await userModel.findOne({ email });
    if (!checkUser) {
        throw new AppError('user email not found try sign up first', 404);
    }
    let checkPass = await bcrypt.compare(password, checkUser.password);
    if (!checkPass) {
        throw new AppError('wrong password try again', 400);
    } 
                        /// encode  data 
    let token = await jwt.sign({ id: checkUser._id }, PRIVATE_KEY);
    res.status(200).json({ message: 'login successfully', token })
}

export const getUser = async (req, res) => {
    console.log(req.role);
    console.log(req.userId);
    let users = await userModel.find();
    res.status(200).json(users);
}

export const getUserById = async (req, res) => {

}