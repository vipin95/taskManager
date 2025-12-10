import express from "express";
import { signUp, login, google, guestLogin, redirectToGoogle, logout } from "./auth.controller";
let router = express.Router();

router.get('/guest-login', guestLogin);
router.delete('/logout', logout);
router.post('/sign-up', signUp);
router.post('/login', login);
router.get('/google/g-login', google);
router.get('/google', redirectToGoogle);

export default router;