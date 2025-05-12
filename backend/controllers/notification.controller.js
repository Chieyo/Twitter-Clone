import Notification from "../models/notification.model.js";

export const getNotifications = async (req,res) => {
   try {
        const userId = req.user._id;

        const notifications = await Notification.find({to: userId})
        .populate({
            path: "from",
            select: "username profileImg"
        });

        await Notification.updateMany({to: userId}, {read: true});

        res.status(200).json(notifications);
   } 
   catch (error) {
        console.log("Error in the getNotifications controller", error.message);
        res.status(500).json({error: "Internal server error"});
   } 
};

export const deleteNotifications = async (req,res) => {
   try {
        const userId = req.user._id;

        // Check if the user has any notifications
        const notificationsExist = await Notification.exists({ to: userId });
        
        if (!notificationsExist) {
            return res.status(200).json({ message: "No notifications to delete" });
        }

        await Notification.deleteMany({to:userId});

        res.status(200).json({message: "Notifications deleted successfully"});
   } 
   catch (error) {
        console.log("Error in the deleteNotifications controller", error.message);
        res.status(500).json({error: "Internal server error"});
   } 
};