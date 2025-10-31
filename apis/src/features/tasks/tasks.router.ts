import express, {type Request, type Response } from "express";
import {listTask, addTask, updatetask, deleteTask} from "./tasks.controller.ts";

let router = express.Router();

router.get('/task', listTask);
router.post('/task', addTask);
router.put('/task', updatetask)
router.delete('/task', deleteTask)

export default router;