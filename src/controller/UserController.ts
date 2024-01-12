import User from "../model/UserModel";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Joi from "joi";
import { generateAccessToken, CustomRequest } from "../middleware/auth";



const signupSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().min(6),
    gender: Joi.string().required(),
});

export const signup = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { error } = signupSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { fullName, email, phone, address, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            phone,
            address,
            password: hashedPassword,
            gender
        });

        // Save the user to the database
        await newUser.save();

        // res.status(201).json({ message: 'User created successfully.' });
        res.redirect('/users/signup')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
    }
    const user: any = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(user);
    const userId = user.id;

    req.session.token = accessToken;
    req.session.userId = userId;
    req.session.fullName = user.fullName;
    next();
};