import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const update = async (req, res, next) => {
    if (req.user.role === "super-admin" || req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true })
            //remove password from the response
            const { password, ...others } = updatedUser._doc;
            res.status(200).json({success : true, message: "User Updated Successfully", data: others})
        } catch (err) {
            next(err)
        }
    } else {
        return res.status(200).json({ success: false, message: "You don't have access to update this account" })
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.role === "super-admin" || req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("User has been deleted!")
        } catch (err) {
            next(err)
        }
    } else {
        return res.status(200).json({ success: false, message: "You don't have access to delete this account" })
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
};

export const addUser = async (req, res, next) => {
    try {

        //check if the user is super-admin or admin
        if(req.user.role !== "super-admin" || req.user.role !== "admin"){
            return res.status(200).json({success : false, message: "You don't have access to create a new user"});
        }
        
        // Check if the email is already in the database
        const mailCheck = await User.findOne({ email : req.body.email });
        if(mailCheck) {
            res.status(200).json({success : false, message: "Email Already Exists"});
        }else{
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the saltRounds

            // Create a new user object with the hashed password
            const newUser = new User({
                ...req.body,
                password: hashedPassword // Replace the plain password with the hashed one
            });

            // Save the user to the database
            const user = await newUser.save();
            res.status(200).json({ success: true, message: "User Created Successfully", data: user });
        }
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        // Get limit and page from URL parameters or set default values
        const limit = parseInt(req.params.limit) || 100;
        const page = parseInt(req.params.page) || 1;

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Find users based on pagination parameters
        const users = await User.find({}).skip(skip).limit(limit);

        // Check if there are more users beyond the current page
        const totalUsersCount = await User.countDocuments();
        const hasNextPage = (page * limit) < totalUsersCount;

        // Create a nextCursor if there are more results
        let nextCursor = null;
        if (hasNextPage) {
            nextCursor = {
                page: page + 1,
                limit
            };
        }

        // Prepare response
        const response = {
            success: true,
            message: "Users fetched successfully",
            data: users,
            hasNextPage: hasNextPage,
            nextCursor: nextCursor
        };

        // Send the response
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

//change password
export const changePassword = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try{
            const user = await User.findById(req.params.id);
            const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
            if(!validPassword){
                return res.status(200).json({success : false, message: "Invalid Old Password"});
            }
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({success : true, message: "Password Changed Successfully"});
        }catch(err){
            next(err);
        }
    }else{
        return res.status(200).json({success : false, message: "You don't have access to change this password"});
    }
};