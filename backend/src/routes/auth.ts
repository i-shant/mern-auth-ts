import { Router } from "express";
import { login, logout, register } from "../controller/auth";

const router = Router();

router.post("/", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
