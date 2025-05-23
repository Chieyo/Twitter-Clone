//Packages
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
//Models
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";


export const getUserProfile = async (req,res) => {
    const {username} = req.params;

    try{
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error in the getUserProfile controller", error.message);
        res.status(500).json({error:error.message});
    }
};

export const followership = async (req,res) => {
    try{
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){
            return res.status(400).json({error: "You can't follow/unfollow yourself"});
        }

        if(!userToModify || !currentUser){
            return res.status(400).json({error: "User not found"});
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            //Unfollow  user
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});

            //Send notification to user
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            res.status(200).json({message: "User unfollowed successfully"});
        }
        else{
            //Follow user
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
           
            //Send notification to user
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save();

            res.status(200).json({message: "User followed successfully"});

        }

    }
    catch(error){
        console.log("Error in the followership controller", error.message);
        res.status(500).json({error:error.message});
    }
};

export const getSuggestedUsers = async (req,res) => {
    try{
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match:{
                    _id: {$ne:userId}
                }
            },
            {$sample:{size:10}}
        ])

        //Filters out followed users and self from suggestedUsers
        const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0,10);

        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json(suggestedUsers);
    }
    catch(error){
        console.log("Error in the getSuggestedUsers controller", error.message);
        res.status(500).json({error:error.message});  
    }

};

export const updateUser = async (req,res) => {
    const {fullName, username, email, currentPassword, newPassword, bio,link} = req.body;

    let{profileImg,coverImg} = req.body;

    const userId = req.user._id;
    
    try{
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({error: "Please provide both current password and new password"});
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return res.status(400).json({error: "Current password is incorrect"});
            }
            if(newPassword.length < 6){
                return res.status(400).json({error: "Password must be atleast 6 characters long"});
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if(profileImg){
            //Delete previous profileImg
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
            //Upload new profileImg
            const uploadedResponse = await cloudinary.uploader.upload(profileImg)
            profileImg = uploadedResponse.secure_url;
        }

        if(coverImg){
            //Delete previous coverImg
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            }
            //Upload new coverImg
            const uploadedResponse = await cloudinary.uploader.upload(coverImg)
            coverImg = uploadedResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();

        //Password should be null in response
        user.password = null;

        return res.status(200).json(user);

    }
    catch(error){
        console.log("Error in the updateUsers controller", error.message);
        res.status(500).json({error:error.message});   
    }
}