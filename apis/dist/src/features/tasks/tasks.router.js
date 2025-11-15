"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("./tasks.controller");
let router = express_1.default.Router();
router.get('/task', tasks_controller_1.listTask);
router.get('/task/:id', tasks_controller_1.FetchTask);
router.post('/task', tasks_controller_1.addTask);
router.put('/task', tasks_controller_1.updatetask);
router.delete('/task/:id', tasks_controller_1.deleteTask);
exports.default = router;
