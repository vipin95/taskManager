import express, {type Request, type Response } from "express";
import {listTask, addTask, updatetask, deleteTask, FetchTask} from "./tasks.controller";

let router = express.Router();

router.get('/task', listTask);
router.get('/task/:id', FetchTask);
router.post('/task', addTask);
router.put('/task', updatetask)
router.delete('/task/:id', deleteTask)

export default router;