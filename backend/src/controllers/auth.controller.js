import express from 'express';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateToken from '../lib/utils.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import cloudinary from '../lib/cloudinary.js';

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
    
        if (!profilePic) {
          return res.status(400).json({ message: "Profile pic is required" });
        }
    
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePic: uploadResponse.secure_url },
          { new: true }
        );
    
        res.status(200).json(updatedUser);
      } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
      } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}