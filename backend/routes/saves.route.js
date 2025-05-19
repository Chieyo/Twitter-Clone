import express from "express";
import { protectRoute } from '../middleware/protectRoute.js';
import {  getSavedPosts, savePost } from '../controllers/saves.controller.js';

const router = express.Router();

router.get("/", protectRoute, getSavedPosts);
router.post("/:id", protectRoute, savePost);

export default router;