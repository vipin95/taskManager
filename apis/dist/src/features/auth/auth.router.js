"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
let router = express_1.default.Router();
router.get('/guest-login', auth_controller_1.guestLogin);
router.post('/sign-up', auth_controller_1.signUp);
router.post('/login', auth_controller_1.login);
router.get('/google/g-login', auth_controller_1.google);
router.get('/google', auth_controller_1.redirectToGoogle);
exports.default = router;
