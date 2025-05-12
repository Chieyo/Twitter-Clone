import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followership, getSuggestedUsers, getUserProfile, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followership);
router.post("/update", protectRoute, updateUser);


export default router;