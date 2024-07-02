import { User } from '../models/auth.models.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { generateOTP } from "../utils/generateOTP.js"

//signup
const signup = async (req, res)=> {
    const { username, fullname, email, password } = req.body;
    
    try 
    {
        if(
            [username, fullname, email, password].some((field) => field?.trim() === "")
        ){
            return res.status(400).json({msg:'All Fields Are Required.'})
        }

        const existedUser = await User.findOne({ email })
        if(existedUser){
            return res.status(400).json({msg:'User Already Exist!'})
        }

        await User.create({ username, fullname, email, password });
        
        res.status(200).json({msg:'User Created Successfully!'})

    } catch (error) {
        res.status(500).json({msg:'Somethig Went Wrong While Register a User',error})
    }
}

// Configuration of nodemailer
const sendOTPEmail = async (email, otp) => {
    
    const sender = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const receiver = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    await sender.sendMail(receiver);
};


// login
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and Password are required!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found! Please sign up.' });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: 'Incorrect password!' });
        }

        const otp = generateOTP();
        user.otp = otp;
        await user.save();
        await sendOTPEmail(email, otp);

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ msg: 'OTP sent to email. Please verify OTP.', userId: user._id, token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ msg: 'Internal server error!' });
    }
};


// verification of OTP
const verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        if (!userId || !otp) {
            return res.status(400).json({ msg: 'User ID and OTP are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User not found.' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP.' });
        }

        user.otp = null; // Clear OTP after verification
        await user.save();

        res.status(200).json({ msg: 'OTP Verified. Login Successful.' });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error!' });
    }
};


// login with jwt Token
const jwtLogin = async(req, res) => {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Login successful Using Token' });
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
}

//Change Password 
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ msg: 'All fields are required.' });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(400).json({ msg: 'User not found.' });
        }

        if (user.password !== currentPassword) {
            return res.status(400).json({ msg: 'Current password is incorrect.' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: 'New passwords do not match.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ msg: 'Password changed successfully.' });
    } catch (error) {
        // console.error('Error during password change:', error);
        res.status(500).json({ msg: 'Internal server error.' });
    }
};

// logout
const logout = async (req, res) =>{
    res.clearCookie('Newtoken')
    res.status(200).json({ msg: 'Logout Successful!' });
}


export {
    signup,
    login,
    verifyOTP,
    jwtLogin,
    changePassword,
    logout
}