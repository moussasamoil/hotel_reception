import { AppError } from "../middleware/appError.js";

export const validator = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.query, ...req.params }; /// id ===> body  , id===> params
        const errors = [];
        let validate = schema.validate(data, { abortEarly: false });
        if (validate.error) {
            console.log(validate);
            errors.push(validate.error.details?.map(err => err.message));
            return next(new AppError(errors, 400))
        }
        return next();
    }
}