"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestLogin = exports.redirectToGoogle = exports.google = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_user_1 = __importDefault(require("../../model/sequelize_user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_SSO_1 = __importDefault(require("../../config/google_SSO"));
const signUp = async (req, res, next) => {
    /*  1. data received
        2. Basic( hash ) Auth with JWT added
        todo: add email already exist or not check perform;
    */
    try {
        let User = await sequelize_user_1.default.findOne({
            where: { "email": req.body.email }
        });
        if (!User) {
            let password = await bcrypt_1.default.hash(req.body.password, 14), email = req.body.email;
            await sequelize_user_1.default.create({ "password": password, "email": email });
            res.status(201).json({ "message": "User Created Successfully!" });
        }
        else {
            res.status(401).json("User already Exist!");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.signUp = signUp;
const login = async (req, res, next) => {
    try {
        let password = req.body.password, email = req.body.email;
        let hashed = await sequelize_user_1.default.findOne({
            where: { "email": email }
        });
        if (hashed) {
            let isAuth = await bcrypt_1.default.compare(password, hashed.getDataValue('password'));
            if (isAuth) {
                let token = jsonwebtoken_1.default.sign({ "id": hashed?.getDataValue('id') }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                res.cookie('username', hashed?.getDataValue('name') + "", {
                    secure: false,
                    sameSite: 'lax', // Works on HTTP
                    path: '/', // Available everywhere
                });
                res.cookie('token', token, {
                    secure: false,
                    sameSite: 'lax', // Works on HTTP
                    path: '/', // Available everywhere
                });
                res.status(200).json({ "message": "Successfully login" });
            }
            else {
                res.status(401).json("Invalid User!");
            }
        }
        else {
            res.send("Invalid User!");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// if Token then Valid
// how to know user( then make id available & name ) is guest or normal
const redirectToGoogle = async (req, res) => {
    google_SSO_1.default.authenticate('google', { scope: ['profile', 'email'] })(req, res);
};
exports.redirectToGoogle = redirectToGoogle;
const google = async (req, res, next) => {
    // TODO: retive data and pass JWT token to user
    try {
        google_SSO_1.default.authenticate("google", { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect(`${process.env.CLIENT_URL}/login`);
            }
            let id = `guest_${Math.random().toString(36).substr(2, 9)}`;
            let token = jsonwebtoken_1.default.sign({ "id": id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            res.cookie('username', user.name, {
                secure: false,
                sameSite: 'lax', // Works on HTTP
                path: '/', // Available everywhere
            });
            res.cookie('token', token, {
                secure: false,
                sameSite: 'lax', // Works on HTTP
                path: '/', // Available everywhere
            });
            res.redirect(`${process.env.CLIENT_URL}/list`);
        })(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.google = google;
const guestLogin = async (req, res) => {
    let id = `guest_${Math.random().toString(36).substr(2, 9)}`;
    let token = jsonwebtoken_1.default.sign({ "id": id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.cookie('username', 'Guest', {
        secure: false,
        sameSite: 'lax', // Works on HTTP
        path: '/', // Available everywhere
    });
    res.cookie('token', token, {
        secure: false,
        sameSite: 'lax', // Works on HTTP
        path: '/', // Available everywhere
    });
    res.json({ message: "Login successfully." });
};
exports.guestLogin = guestLogin;
