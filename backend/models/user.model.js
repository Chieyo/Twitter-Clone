import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        //member since july 2023 createdAt
        username:{
            type: String,
            required: true,
            unique: true,
        },

        fullName:{
            type: String,
            required: true,
        },

        age:{
            type: Number
        },

        password:{
            type: String,
            required: true,
            minLength: 6
        },

        email:{
            type: String,
            required: true,
            unique: true
        },

        followers:[
            {
                type: mongoose.Schema.Types.ObjectId, //Followers passed through ID
                ref:"User", //Reference to the user mode - A follower is also a user
                default: [] //A new user has no followers hence the empty array
            }
        ],

        following:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref:"User", 
                default: [] 
            }
        ],

        profileImg:{
            type: String,
            default: ""
        },

        coverImg:{
            type: String,
            default: ""
        },

        bio:{
            type: String,
            default: ""
        },

        link:{
            type: String,
            default: ""
        },

        likedPosts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
                default: []
            },
        ],
    }, 
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;