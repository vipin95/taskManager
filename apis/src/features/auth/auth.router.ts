import express from "express";
import { signUp, login } from "./auth.controller";
let router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);

export default router;