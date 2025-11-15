"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchTask = exports.deleteTask = exports.updatetask = exports.addTask = exports.listTask = void 0;
const tasks_service_1 = require("./tasks.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const listTask = async (req, res, next) => {
    try {
        const cookie_payload = await jsonwebtoken_1.default.decode(req.cookies.token);
        if (!cookie_payload)
            res.status(400).json({ message: "Invalid token" });
        const user_id = cookie_payload.id;
        const tasksList = await (0, tasks_service_1.getTasks)(user_id);
        res.status(200).json(tasksList);
    }
    catch (error) {
        next(error);
    }
};
exports.listTask = listTask;
const FetchTask = async (req, res, next) => {
    try {
        const cookie_payload = await jsonwebtoken_1.default.decode(req.cookies.token);
        if (!cookie_payload)
            res.status(400).json({ message: "Invalid token" });
        const user_id = cookie_payload.id;
        const id = parseInt(req.params.id);
        const tasksList = await (0, tasks_service_1.getTasks)(user_id, id);
        res.status(200).json(tasksList);
    }
    catch (error) {
        next(error);
    }
};
exports.FetchTask = FetchTask;
const addTask = async (req, res, next) => {
    try {
        const cookie_payload = await jsonwebtoken_1.default.decode(req.cookies.token);
        if (!cookie_payload)
            res.status(400).json({ message: "Invalid token" });
        const user_id = cookie_payload.id;
        const tasksList = await (0, tasks_service_1.postTasks)(user_id, req.body);
        res.status(200).json(tasksList);
    }
    catch (error) {
        next(error);
    }
};
exports.addTask = addTask;
const updatetask = async (req, res, next) => {
    try {
        const tasksList = await (0, tasks_service_1.putTasks)(req.body);
        res.status(200).json(tasksList);
    }
    catch (error) {
        next(error);
    }
};
exports.updatetask = updatetask;
const deleteTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        console.log(typeof id);
        const tasksList = await (0, tasks_service_1.deleteTasks)(id);
        res.status(200).json("tasksList");
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
