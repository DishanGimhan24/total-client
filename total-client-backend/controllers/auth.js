import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const userLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(200).json({success: false, message: "User not found!"});

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, { expiresIn: "7d" })
        const { password, ...others } = user._doc;

        //if password is correct send the token and the user details
        if(isCorrect){
            return res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).status(200).json({success: true, message: "Login Successful!", data: others});
        }else{
            return res.status(200).json({success: false, message: "Wrong Credentials!"});
        }
    } catch (err) {
        return res.status(200).json({success: false, message: "An error occurred!"});
    }
};