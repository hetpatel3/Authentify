import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullname: {
            type: String,
            require: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            require: false
        },
        googleId: {
            type: String,
            sparse: true
        },
        otp:String,
        otpExpiry: Date,
        role: {
            type: String,
            default: 'user'
        }
    },
    {
    timestamps:true
    }
)

export const User = mongoose.model("User", userSchema)