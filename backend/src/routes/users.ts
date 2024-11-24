import { Router } from "express";
import { protect } from "../middleware/auth";
import { getUser } from "../controller/users";

const router = Router();

router.get("/", protect, getUser);

export default router;
