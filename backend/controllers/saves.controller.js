import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// GET /api/saves
export const getSavedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) return res.status(404).json({ error: "User not found" });

		const savedPosts = await Post.find({ _id: { $in: user.savedPosts } })
		.populate({
        path: "user",
        select: "username fullName profileImg"
        })
        .populate({
            path: "comment.user",
            select: "username fullName profileImg"
        })

		res.status(200).json(savedPosts);
	} catch (error) {
		console.error("Error in getSavedPosts:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// POST /api/saves/:id
export const savePost = async (req,res) => {
    try {
        const userId = req.user._id;
        const {id:postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        const userSavedPost = post.saves.includes(userId);

        if(userSavedPost){
            //Unlike post
            await Post.updateOne({_id:postId},{$pull: {saves: userId}});
            await User.updateOne({_id:userId},{$pull: {savedPosts: postId}});

            const updatedSaves = post.saves.filter((id) => id.toString() !== userId.toString());

            res.status(200).json(updatedSaves);
        }
        else{
            //Like post
            post.saves.push(userId);
            await User.updateOne({_id:userId},{$push: {savedPosts: postId}});
            await post.save();

            const updatedSaves = post.saves;

            res.status(200).json(updatedSaves);
        }
    } 
    catch (error) {
        console.log("Error in the savePost controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};