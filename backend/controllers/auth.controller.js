import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req,res) => {
    try{
        const {fullName, username, email, password} = req.body;

        //Checks email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format"});
        }

        //Checks if email exists
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email is already taken"});
        }

        //Checks if username exists
        const existingUser = await User.findOne({username});
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

        //Checks password length
        if(password.length < 6){
            return res.status(400).json({error: "Password must be 6 characters long"});
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Creates new user
        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword
        })
        
        //Generates token for new User passed to server and returns cookie with the user's data
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })
        }
        else{
            res.status(400).json({error: "Invalid user data"});
        }
    }
    catch(error){
        console.log("Error in the signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
    
    res.json({
        data: "You hit the signup endpoint.",
    });
};

export const login = async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        //Checks if password entered matches the user password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        //Checks if username exists
        if(!user){
            return res.status(400).json({error: "Username not found"})
        }

        //Checks if password is correct
        if(!isPasswordCorrect){
           return res.status(400).json({error: "Incorrect password"}) 
        }

        //Generate new token and returns user cookie
        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        });
    }
    catch(error){
       console.log("Error in the login controller", error.message);
       res.status(500).json({error:"Internal Server Error"}); 
    }
};

export const logout = async (req,res) => {
    try{
        //Destroys cookie
        res.cookie("jwt","",{maxAge:0}) 
        res.status(200).json({error: "Logged out successfully"})
    }
    catch(error){
       console.log("Error in the login controller", error.message);
       res.status(500).json({error:"Internal Server Error"}); 
    }
};

//Gets authenticated user
export const getMe = async(req,res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error in the getMe controller", error.message);
        res.status(500).json({error:"Internal Server Error"}); 
    }
}