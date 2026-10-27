import mongoose from "mongoose";
export const userRole = ['receptionist', 'admin', 'manager'];
export const userRole2 = {
    receptionist: "receptionist",
    admin: "admin",
    manager: "manager"
}
// 3 layers 
// 1 front end =====>
// 2 backend   =====>
// 3 database  =====>

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [3, 'custom message'],
        maxLength: 80
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "invalid email"
        ]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: userRole,
        default: userRole.at(0)
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema)