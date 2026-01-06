import express, {type Request, type Response } from "express";
import {listTask, addTask, updatetask, deleteTask, FetchTask} from "./tasks.controller";
import authCheck from "../../middleware/authCheck";
let router = express.Router();

router.get('/task', authCheck,listTask);
router.get('/task/:id', authCheck, FetchTask);
router.post('/task', authCheck, addTask);
router.put('/task', authCheck, updatetask);
router.delete('/task/:id', authCheck, deleteTask)

export default router;